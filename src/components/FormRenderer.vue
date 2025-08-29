<template>
  <Card class="w-full max-w-2xl mx-auto">
    <CardHeader>
      <CardTitle>{{ schema.title }}</CardTitle>
      <CardDescription v-if="schema.description">
        {{ schema.description }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div v-for="field in schema.fields" :key="field.id" class="form-field">
          <component
            :is="getFieldComponentSafe(field.type)"
            :field="field"
            :model-value="formData[field.id]"
            :errors="errors[field.id] || []"
            :disabled="disabled"
            @update:model-value="updateField(field.id, $event)"
            @blur="touchField(field.id)"
          />
        </div>

        <div class="flex gap-4 pt-4">
          <Button type="submit" :disabled="disabled || !isValid">
            Submit
          </Button>
          <Button
            type="button"
            variant="outline"
            @click="resetForm"
            :disabled="disabled"
          >
            Reset
          </Button>
        </div>

        <div v-if="showDebug" class="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 class="font-semibold mb-2">Debug Info:</h3>
          <div class="space-y-2 text-sm">
            <div><strong>Form Valid:</strong> {{ isValid }}</div>
            <div>
              <strong>Form Data:</strong>
              {{ JSON.stringify(formData, null, 2) }}
            </div>
            <div>
              <strong>Errors:</strong> {{ JSON.stringify(errors, null, 2) }}
            </div>
          </div>
        </div>
      </form>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { FormSchema } from '@/types/schema';
import { useFormValidation } from '@/composables/useFormValidation';
import { getFieldComponent, registerField } from '@/lib/field-registry';

import TextField from '@/components/form-fields/TextField.vue';
import EmailField from '@/components/form-fields/EmailField.vue';
import TextareaField from '@/components/form-fields/TextareaField.vue';
import SelectField from '@/components/form-fields/SelectField.vue';
import FallbackField from '@/components/form-fields/FallbackField.vue';

interface Props {
  schema: FormSchema;
  disabled?: boolean;
  showDebug?: boolean;
}

interface Emits {
  submit: [data: any];
  reset: [];
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  showDebug: false,
});

const emit = defineEmits<Emits>();

registerField('text', TextField);
registerField('email', EmailField);
registerField('textarea', TextareaField);
registerField('select', SelectField);

const {
  formData,
  errors,
  isValid,
  updateField,
  touchField,
  validateForm,
  resetForm: resetFormData,
} = useFormValidation(props.schema);

const getFieldComponentSafe = (type: string) => {
  const component = getFieldComponent(type);
  if (!component) {
    console.warn(
      `Field component for type "${type}" not found. Using FallbackField to display error.`
    );
    return FallbackField;
  }
  return component;
};

const handleSubmit = () => {
  const validation = validateForm();
  if (validation.isValid) {
    emit('submit', { ...formData });
  }
};

const resetForm = () => {
  resetFormData();
  emit('reset');
};
</script>
