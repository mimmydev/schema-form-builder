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
    <Textarea
      :id="field.id"
      :placeholder="field.placeholder"
      :disabled="disabled || field.disabled"
      :model-value="modelValue"
      :class="{ 'border-red-500': errors.length > 0 }"
      rows="4"
      @update:model-value="$emit('update:modelValue', $event)"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />
    <div v-if="errors.length > 0" class="space-y-1">
      <p v-for="error in errors" :key="error" class="text-sm text-red-600">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type {
  FieldComponentProps,
  FieldComponentEmits,
} from '@/lib/field-registry';

defineProps<FieldComponentProps>();
defineEmits<FieldComponentEmits>();
</script>
