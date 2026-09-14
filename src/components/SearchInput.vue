<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  debounceMs: { type: Number, default: 400 },
  placeholder: { type: String, default: 'Search product...' },
})
const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)
let timer = null

watch(localValue, (value) => {
  clearTimeout(timer)
  timer = setTimeout(() => emit('update:modelValue', value), props.debounceMs)
})

watch(
  () => props.modelValue,
  (value) => {
    if (value !== localValue.value) localValue.value = value
  }
)
</script>

<template>
  <input
    v-model="localValue"
    type="search"
    :placeholder="placeholder"
    class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
  />
</template>
