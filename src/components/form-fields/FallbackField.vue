<template>
  <div class="space-y-2">
    <Label :for="field.id" class="text-sm font-medium">
      {{ field.label }}
      <span
        v-if="field.required || field.validation?.required"
        class="text-red-500"
        >*</span
      >
    </Label>
    <div class="border-2 border-dashed border-red-300 bg-red-50 p-4 rounded-md">
      <div class="flex items-center space-x-2">
        <svg
          class="w-5 h-5 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        <div>
          <p class="text-sm font-medium text-red-800">
            Missing Field Component
          </p>
          <p class="text-sm text-red-600">
            Field component for type
            <code class="bg-red-100 px-1 rounded">"{{ field.type }}"</code> is
            not registered.
          </p>
          <p class="text-xs text-red-500 mt-1">
            Please create and register a component for this field type.
          </p>
        </div>
      </div>
    </div>
    <div v-if="errors.length > 0" class="space-y-1">
      <p v-for="error in errors" :key="error" class="text-sm text-red-600">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Label } from '@/components/ui/label';
import type {
  FieldComponentProps,
  FieldComponentEmits,
} from '@/lib/field-registry';

defineProps<FieldComponentProps>();
defineEmits<FieldComponentEmits>();
</script>
