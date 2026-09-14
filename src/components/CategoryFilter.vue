<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  categories: { type: Array, default: () => [] }, 
})
defineEmits(['update:modelValue'])
</script>

<template>
  <select
    :value="modelValue"
    class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 sm:w-56"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option value="">All Categories</option>
    <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">
      {{ cat.name }}
    </option>
  </select>
</template>