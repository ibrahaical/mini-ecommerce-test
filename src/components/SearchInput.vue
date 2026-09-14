<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
  debounceMs: { type: Number, default: 400 },
  placeholder: { type: String, default: "Search product..." },
});
const emit = defineEmits(["update:modelValue"]);

const localValue = ref(props.modelValue);
let timer = null;

watch(localValue, (value) => {
  clearTimeout(timer);
  timer = setTimeout(() => emit("update:modelValue", value), props.debounceMs);
});

watch(
  () => props.modelValue,
  (value) => {
    if (value !== localValue.value) localValue.value = value;
  },
);
</script>

<template>
  <div class="relative w-full">
    <svg
      class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m21 21-4.5-4.5m2-5.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
      />
    </svg>

    <input
      v-model="localValue"
      type="search"
      :placeholder="placeholder"
      class="w-full rounded-md border border-neutral-300 py-2 pl-9 pr-3 text-sm shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
    />
  </div>
</template>
