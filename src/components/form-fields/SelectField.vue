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
    <Select
      :disabled="disabled || field.disabled"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <SelectTrigger :class="{ 'border-red-500': errors.length > 0 }">
        <SelectValue :placeholder="field.placeholder" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          v-for="option in field.options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </SelectItem>
      </SelectContent>
    </Select>
    <div v-if="errors.length > 0" class="space-y-1">
      <p v-for="error in errors" :key="error" class="text-sm text-red-600">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type {
  FieldComponentEmits,
  FieldComponentProps,
} from '@/lib/field-registry';

defineProps<FieldComponentProps>();
defineEmits<FieldComponentEmits>();
</script>
