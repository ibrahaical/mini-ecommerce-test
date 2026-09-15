<script setup>
import { ref, nextTick, onUnmounted } from 'vue'

const isOpen = ref(false)
const status = ref('disconnected')
const localSdp = ref('')
const remoteSdp = ref('')
const messages = ref([])
const newMessage = ref('')
const chatContainer = ref(null)
const errorMsg = ref('')

let peerConnection = null
let dataChannel = null

const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
  ],
}

function resetState() {
  status.value = 'disconnected'
  localSdp.value = ''
  remoteSdp.value = ''
  messages.value = []
  errorMsg.value = ''
  if (dataChannel) dataChannel.close()
  if (peerConnection) peerConnection.close()
  dataChannel = null
  peerConnection = null
}

function initConnection() {
  peerConnection = new RTCPeerConnection(configuration)

  peerConnection.onicecandidate = (event) => {
    // Memperbarui SDP lokal pada setiap ICE candidate baru.
    if (peerConnection.localDescription) {
       localSdp.value = btoa(JSON.stringify(peerConnection.localDescription))
    }
  }

  peerConnection.onicegatheringstatechange = () => {
    if (peerConnection.iceGatheringState === 'complete') {
      localSdp.value = btoa(JSON.stringify(peerConnection.localDescription))
    }
  }

  peerConnection.onconnectionstatechange = () => {
    if (peerConnection.connectionState === 'connected') {
      status.value = 'connected'
    } else if (peerConnection.connectionState === 'disconnected' || peerConnection.connectionState === 'failed') {
      resetState()
    }
  }

  peerConnection.ondatachannel = (event) => {
    dataChannel = event.channel
    setupDataChannel()
  }
}

function setupDataChannel() {
  dataChannel.onopen = () => {
    status.value = 'connected'
  }
  dataChannel.onclose = () => {
    resetState()
  }
  dataChannel.onmessage = (event) => {
    messages.value.push({ sender: 'peer', text: event.data })
    scrollToBottom()
  }
}

async function createOffer() {
  errorMsg.value = ''
  initConnection()
  dataChannel = peerConnection.createDataChannel('chat')
  setupDataChannel()

  status.value = 'creating-offer'
  
  try {
    const offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    localSdp.value = btoa(JSON.stringify(peerConnection.localDescription))
  } catch (err) {
    errorMsg.value = 'Gagal membuat room'
    resetState()
  }
}

async function acceptAnswer() {
  errorMsg.value = ''
  if (!remoteSdp.value) return
  try {
    const answer = JSON.parse(atob(remoteSdp.value))
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
    // Menunggu data channel terbuka
  } catch (err) {
    errorMsg.value = 'Kode Answer tidak valid'
  }
}

async function acceptOfferAndCreateAnswer() {
  errorMsg.value = ''
  if (!remoteSdp.value) return
  try {
    initConnection()
    const offer = JSON.parse(atob(remoteSdp.value))
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
    
    status.value = 'creating-answer'
    
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)
    localSdp.value = btoa(JSON.stringify(peerConnection.localDescription))
  } catch (err) {
    errorMsg.value = 'Kode Offer tidak valid'
    resetState()
  }
}

function copyLocalSdp() {
  navigator.clipboard.writeText(localSdp.value)
  // Optional: tampilkan notifikasi pop-up sederhana
}

function sendMessage() {
  if (!newMessage.value.trim() || !dataChannel || dataChannel.readyState !== 'open') return
  
  dataChannel.send(newMessage.value)
  messages.value.push({ sender: 'me', text: newMessage.value })
  newMessage.value = ''
  scrollToBottom()
}

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

function toggleChat() {
  isOpen.value = !isOpen.value
}

// Mencegah Memory Leak saat komponen di-unmount dari DOM
onUnmounted(() => {
  resetState()
})

function endChat() {
  resetState()
}
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Tombol Floating -->
    <button
      v-if="!isOpen"
      @click="toggleChat"
      class="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>

    <!-- Jendela Chat -->
    <div
      v-else
      class="flex h-[32rem] max-h-[80vh] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl transition-all sm:w-96"
    >
      <!-- Header -->
      <div class="flex items-center justify-between bg-neutral-900 px-4 py-3 text-white">
        <h3 class="font-semibold text-sm">P2P Chat</h3>
        <div class="flex items-center gap-3">
          <span v-if="status === 'connected'" class="flex h-2 w-2 rounded-full bg-emerald-500" title="Connected"></span>
          <button v-if="status !== 'disconnected'" @click="endChat" class="text-xs text-red-400 hover:text-red-300" title="End Chat">
            End
          </button>
          <button @click="toggleChat" class="text-neutral-300 hover:text-white" title="Minimize">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      <!-- Konten -->
      <div class="flex flex-1 flex-col overflow-y-auto p-4 text-sm">
        <p v-if="errorMsg" class="mb-2 rounded bg-red-100 p-2 text-xs text-red-700">{{ errorMsg }}</p>

        <!-- Disconnected State -->
        <div v-if="status === 'disconnected'" class="flex flex-col gap-4">
          <div class="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
            <p class="mb-3 font-medium text-neutral-800">Mulai chat baru</p>
            <button @click="createOffer" class="w-full rounded-md bg-neutral-900 py-2 text-white hover:bg-neutral-800 transition-colors">
              Buat Room (Offer)
            </button>
          </div>
          <div class="text-center text-xs text-neutral-500 font-medium">ATAU</div>
          <div class="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
            <p class="mb-3 font-medium text-neutral-800">Gabung ke chat</p>
            <textarea
              v-model="remoteSdp"
              placeholder="Paste kode offer di sini..."
              class="mb-3 w-full rounded border border-neutral-300 p-2 text-xs focus:border-neutral-500 focus:outline-none"
              rows="3"
            ></textarea>
            <button @click="acceptOfferAndCreateAnswer" class="w-full rounded-md border border-neutral-900 bg-white py-2 font-medium text-neutral-900 hover:bg-neutral-100 transition-colors" :disabled="!remoteSdp">
              Gabung Room (Answer)
            </button>
          </div>
        </div>

        <!-- Creating Offer State -->
        <div v-else-if="status === 'creating-offer'" class="flex flex-col gap-4">
          <p class="text-xs text-neutral-600 font-medium">1. Kirim kode ini ke temanmu:</p>
          <div class="relative">
            <textarea
              readonly
              :value="localSdp"
              class="w-full rounded border border-neutral-200 bg-neutral-100 p-2 text-xs text-neutral-500 focus:outline-none break-all"
              rows="4"
            ></textarea>
            <button @click="copyLocalSdp" class="absolute right-2 top-2 rounded bg-white border border-neutral-300 px-2 py-1 text-[10px] font-medium hover:bg-neutral-50 shadow-sm">Copy</button>
          </div>
          <p class="text-xs text-neutral-600 font-medium mt-2">2. Paste balasan kode dari temanmu di sini:</p>
          <textarea
            v-model="remoteSdp"
            placeholder="Paste kode balasan (answer) di sini..."
            class="w-full rounded border border-neutral-300 p-2 text-xs focus:border-neutral-500 focus:outline-none break-all"
            rows="3"
          ></textarea>
          <button @click="acceptAnswer" class="w-full rounded-md bg-neutral-900 py-2 text-white hover:bg-neutral-800 transition-colors" :disabled="!remoteSdp">
            Hubungkan
          </button>
        </div>

        <!-- Creating Answer State -->
        <div v-else-if="status === 'creating-answer'" class="flex flex-col gap-4">
          <p class="text-xs text-neutral-600 font-medium">Kirim balik kode ini ke temanmu:</p>
          <div class="relative">
            <textarea
              readonly
              :value="localSdp"
              class="w-full rounded border border-neutral-200 bg-neutral-100 p-2 text-xs text-neutral-500 focus:outline-none break-all"
              rows="4"
            ></textarea>
            <button @click="copyLocalSdp" class="absolute right-2 top-2 rounded bg-white border border-neutral-300 px-2 py-1 text-[10px] font-medium hover:bg-neutral-50 shadow-sm">Copy</button>
          </div>
          <div class="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-neutral-500 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
            <div class="h-3 w-3 animate-spin rounded-full border-2 border-neutral-400 border-t-neutral-800"></div>
            Menunggu teman terhubung...
          </div>
        </div>

        <!-- Connected State (Chat UI) -->
        <div v-else-if="status === 'connected'" class="flex h-full flex-col">
          <div class="mb-4 text-center text-[10px] text-neutral-400 font-medium bg-neutral-50 py-1 rounded-full border border-neutral-100 mx-4">
            Terhubung via WebRTC P2P
          </div>
          <div ref="chatContainer" class="flex-1 overflow-y-auto pb-2 pr-1">
            <div v-if="messages.length === 0" class="flex h-full items-center justify-center text-xs text-neutral-400">
              Belum ada pesan. Sapa temanmu!
            </div>
            <div class="flex flex-col gap-3">
              <div
                v-for="(msg, i) in messages"
                :key="i"
                class="max-w-[85%] rounded-2xl px-3 py-2"
                :class="msg.sender === 'me' ? 'self-end bg-neutral-900 text-white rounded-br-sm' : 'self-start bg-neutral-100 text-neutral-900 rounded-bl-sm border border-neutral-200'"
              >
                <div class="text-[10px] opacity-70 mb-0.5 font-medium">{{ msg.sender === 'me' ? 'Me' : 'Peer' }}</div>
                <div class="break-words leading-relaxed">{{ msg.text }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Area Input Pesan (Hanya tampil saat terhubung) -->
      <div v-if="status === 'connected'" class="border-t border-neutral-100 bg-white p-3">
        <form @submit.prevent="sendMessage" class="flex items-center gap-2">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Ketik pesan..."
            class="flex-1 rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
          />
          <button
            type="submit"
            :disabled="!newMessage.trim()"
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition-opacity disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
