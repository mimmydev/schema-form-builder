<script setup lang="ts">
import { ref } from 'vue';
import FormRenderer from './components/FormRenderer.vue';
import SchemaEditor from './components/SchemaEditor.vue';
import type { FormSchema } from './types/schema';

const defaultSchema: FormSchema = {
  title: 'Contact Form',
  description: 'Please fill out this contact form and we will get back to you.',
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

const currentSchema = ref<FormSchema>(defaultSchema);
const showDebug = ref(false);

const handleFormSubmit = (data: any) => {
  console.log('Form submitted with data:', data);
  alert('Form submitted successfully! Check the console for details.');
};

const handleFormReset = () => {
  console.log('Form reset');
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">
          Vue 3 Schema Form Builder
        </h1>
        <p class="text-lg text-gray-600 mb-4">
          A TypeScript-powered, extensible form builder using shadcn/vue
          components
        </p>
        <div class="flex justify-center gap-4">
          <label class="flex items-center gap-2">
            <input
              v-model="showDebug"
              type="checkbox"
              class="rounded border-gray-300"
            />
            <span class="text-sm text-gray-700">Show Debug Info</span>
          </label>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="space-y-4">
          <h2 class="text-2xl font-semibold text-gray-800">Schema Editor</h2>
          <SchemaEditor v-model="currentSchema" />
        </div>

        <div class="space-y-4">
          <h2 class="text-2xl font-semibold text-gray-800">Generated Form</h2>
          <FormRenderer
            :schema="currentSchema"
            :show-debug="showDebug"
            @submit="handleFormSubmit"
            @reset="handleFormReset"
          />
        </div>
      </div>
    </div>
  </div>
</template>
