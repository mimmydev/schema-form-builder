# Vue 3 Schema Form Builder

Form builder that dynamically generates forms from JSON schemas. Built with Vue 3, Vite, Shadcn-Vue and modern web technologies.

This schema-driven form system has 4 main layers:

1. Schema Layer `(types/schema.ts)` - Defines WHAT the form looks like
2. Registry Layer `(lib/field-registry.ts)` - Maps field types to components  
3. Rendering Layer `(FormRenderer.vue)` - Converts schema to actual form
4. Logic Layer `(composables/useFormValidation.ts)` - Manages state & validation

The key insight is separation of concerns where the 

- **schema** defines **structure**
- **registry** enables **extensibility**
- **renderer** handles **display**
- **composable** manages **business logic**

## 🚀 Features

- **Schema-Driven**: Define forms using simple JSON schemas
- **TypeScript First**: Fully typed interfaces for better development experience
- **Extensible Fields**: Easy-to-use field registry system for custom field types
- **Built-in Validation**: Comprehensive validation with real-time error display
- **Modern UI**: Beautiful components using shadcn/vue and Tailwind CSS
- **Composable Architecture**: Vue 3 Composition API with reusable composables
- **Hot Module Replacement**: Fast development with Vite

## 📋 Requirements

This project requires specific versions of Node.js and npm to ensure compatibility:

- **Node.js**: `>=20.0.0` (LTS recommended)
- **npm**: `>=10.0.0`

The project includes:
- `.nvmrc` file for Node Version Manager users
- `.npmrc` with `engine-strict=true` to enforce version requirements
- `engines` field in `package.json` for version specification

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd schema-form-builder
   ```

2. **Use the correct Node.js version** (if using nvm)
   ```bash
   nvm use
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

## 🏃‍♂️ Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📖 Usage

### Basic Form Schema

```typescript
const formSchema: FormSchema = {
  title: 'Contact Form',
  description: 'Please fill out this contact form',
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
      placeholder: 'Enter your email',
      required: true,
      validation: {
        required: true,
        email: true,
      },
    },
  ],
};
```

### Using the Form Renderer

```vue
<template>
  <FormRenderer
    :schema="formSchema"
    @submit="handleSubmit"
    @reset="handleReset"
  />
</template>

<script setup lang="ts">
import FormRenderer from './components/FormRenderer.vue';

const handleSubmit = (data: any) => {
  console.log('Form submitted:', data);
};

const handleReset = () => {
  console.log('Form reset');
};
</script>
```

## 🧩 Architecture

### Core Components

- **`FormRenderer.vue`**: Main component that renders forms from schemas
- **`SchemaEditor.vue`**: Interactive schema editor for real-time form building
- **`form-fields/`**: Individual field components (TextField, EmailField, etc.)

### Key Files

- **`types/schema.ts`**: TypeScript interfaces for form schemas and validation
- **`lib/field-registry.ts`**: Field component registration system
- **`composables/useFormValidation.ts`**: Form state and validation logic
- **`utils/validation.ts`**: Core validation functions

### Field Types

Currently supported field types:
- `text` - Text input field
- `email` - Email input with validation
- `textarea` - Multi-line text input
- `number` - Numeric input
- `select` - Dropdown selection
- `checkbox` - Boolean checkbox

### Adding Custom Fields

1. Create a new field component in `src/components/form-fields/`
2. Register it in the `FormRenderer.vue` component:

```typescript
import CustomField from '@/components/form-fields/CustomField.vue';

onMounted(() => {
  registerField('custom', CustomField);
});
```

## 🎨 Styling

The project uses:
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/vue**: High-quality, accessible UI components
- **Tailwind CSS Animate**: Animation utilities

## 🧪 Validation

The validation system supports:
- Required field validation
- String length validation (min/max)
- Email format validation
- Pattern matching (regex)
- Custom validation functions

Example validation rules:

```typescript
validation: {
  required: true,
  minLength: 3,
  maxLength: 100,
  pattern: '^[a-zA-Z0-9]+$',
  custom: (value) => {
    return value.includes('test') ? 'Cannot contain "test"' : null;
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request


## 🔧 Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/vue** - UI component library
- **@vueuse/core** - Vue composition utilities
- **Lucide Vue** - Beautiful icons
