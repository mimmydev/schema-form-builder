import { ref, reactive, computed, readonly } from 'vue'
import type { FormSchema, FormData, FormErrors, ValidationResult } from '@/types/schema'
import { validateField } from '@/utils/validation'

export function useFormValidation(schema: FormSchema) {
  //** Initialize form data with default values
  const formData = reactive<FormData>({})
  const errors = ref<FormErrors>({})
  const touched = ref<Record<string, boolean>>({})

  //** Initialize form data with default values from schema
  schema.fields.forEach(field => {
    formData[field.id] = field.defaultValue ?? ''
    touched.value[field.id] = false
  })

  //** Validate a single field
  const validateSingleField = (fieldId: string) => {
    const field = schema.fields.find(f => f.id === fieldId)
    if (!field) return

    const value = formData[fieldId]
    const fieldErrors: string[] = []

    //** Check if field is required (from field.required or validation.required)
    const isRequired = field.required || field.validation?.required
    if (isRequired && (!value || value === '')) {
      fieldErrors.push('This field is required')
    }

    //** Run validation rules if field has validation and has a value
    if (field.validation && (value || isRequired)) {
      const validationErrors = validateField(value, field.validation)
      fieldErrors.push(...validationErrors)
    }

    errors.value[fieldId] = fieldErrors
  }

  //** Validate all fields
  const validateForm = (): ValidationResult => {
    schema.fields.forEach(field => {
      validateSingleField(field.id)
    })

    const hasErrors = Object.values(errors.value).some(fieldErrors => fieldErrors.length > 0)
    
    return {
      isValid: !hasErrors,
      errors: errors.value
    }
  }

  //** Update field value and validate if touched
  const updateField = (fieldId: string, value: any) => {
    formData[fieldId] = value
    if (touched.value[fieldId]) {
      validateSingleField(fieldId)
    }
  }

  //** Mark field as touched and validate
  const touchField = (fieldId: string) => {
    touched.value[fieldId] = true
    validateSingleField(fieldId)
  }

  //** Reset form to initial state
  const resetForm = () => {
    schema.fields.forEach(field => {
      formData[field.id] = field.defaultValue ?? ''
      touched.value[field.id] = false
    })
    errors.value = {}
  }

  //** Computed properties
  const isValid = computed(() => {
    return Object.values(errors.value).every(fieldErrors => fieldErrors.length === 0)
  })

  const hasErrors = computed(() => {
    return Object.values(errors.value).some(fieldErrors => fieldErrors.length > 0)
  })

  return {
    formData,
    errors: readonly(errors),
    touched: readonly(touched),
    isValid,
    hasErrors,
    updateField,
    touchField,
    validateForm,
    validateSingleField,
    resetForm
  }
}
