<template>
  <Card class="w-full max-w-2xl mx-auto">
    <CardHeader>
      <CardTitle>Schema Editor</CardTitle>
      <CardDescription>
        Edit the JSON schema to customize the form structure and validation
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <div>
          <Label for="schema-editor" class="text-sm font-medium">
            Form Schema (JSON)
          </Label>
          <Textarea
            id="schema-editor"
            :model-value="schemaText"
            @update:model-value="(value) => updateSchema(String(value))"
            placeholder="Enter your form schema as JSON..."
            rows="20"
            class="font-mono text-sm"
            :class="{ 'border-red-500': hasError }"
          />
        </div>

        <div
          v-if="hasError"
          class="p-3 bg-red-50 border border-red-200 rounded-md"
        >
          <p class="text-sm text-red-600 font-medium">JSON Parse Error:</p>
          <p class="text-sm text-red-600">{{ errorMessage }}</p>
        </div>

        <div
          v-if="!hasError && parsedSchema"
          class="p-3 bg-green-50 border border-green-200 rounded-md"
        >
          <p class="text-sm text-green-600 font-medium">✓ Valid JSON Schema</p>
          <p class="text-sm text-green-600">
            {{ parsedSchema.fields?.length || 0 }} field(s) defined
          </p>
        </div>

        <div class="flex gap-2">
          <Button @click="loadSampleSchema" variant="outline" size="sm">
            Load Sample Schema
          </Button>
          <Button
            @click="formatSchema"
            variant="outline"
            size="sm"
            :disabled="hasError"
          >
            Format JSON
          </Button>
          <Button @click="clearSchema" variant="outline" size="sm">
            Clear
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { FormSchema } from '@/types/schema';

interface Props {
  modelValue: FormSchema;
}

interface Emits {
  'update:modelValue': [schema: FormSchema];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const schemaText = ref('');
const hasError = ref(false);
const errorMessage = ref('');

const parsedSchema = computed(() => {
  if (hasError.value) return null;
  try {
    return JSON.parse(schemaText.value) as FormSchema;
  } catch {
    return null;
  }
});

watch(
  () => props.modelValue,
  (newSchema) => {
    if (newSchema) {
      schemaText.value = JSON.stringify(newSchema, null, 2);
    }
  },
  { immediate: true }
);

const updateSchema = (value: string) => {
  schemaText.value = value;

  try {
    const parsed = JSON.parse(value) as FormSchema;
    hasError.value = false;
    errorMessage.value = '';
    emit('update:modelValue', parsed);
  } catch (error) {
    hasError.value = true;
    errorMessage.value =
      error instanceof Error ? error.message : 'Invalid JSON';
  }
};

const loadSampleSchema = () => {
  const sampleSchema: FormSchema = {
    title: 'Contact Form',
    description:
      'Please fill out this contact form and we will get back to you.',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Full Name',
        placeholder: 'Enter your full name',
        required: true,
        validation: {
          required: true,
          minLength: 2,
          maxLength: 50,
        },
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'Enter your email address',
        required: true,
        validation: {
          required: true,
          email: true,
        },
      },
      {
        id: 'message',
        type: 'textarea',
        label: 'Message',
        placeholder: 'Enter your message here...',
        required: true,
        validation: {
          required: true,
          minLength: 10,
          maxLength: 500,
        },
      },
    ],
  };

  updateSchema(JSON.stringify(sampleSchema, null, 2));
};

const formatSchema = () => {
  if (!hasError.value && parsedSchema.value) {
    schemaText.value = JSON.stringify(parsedSchema.value, null, 2);
  }
};

const clearSchema = () => {
  updateSchema('');
};
</script>
