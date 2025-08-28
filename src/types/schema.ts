export interface ValidationRules {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: string
  email?: boolean
  custom?: (value: any) => string | null
}

export interface FormField {
  id: string
  type: 'text' | 'email' | 'textarea' | 'number' | 'select' | 'checkbox'
  label: string
  placeholder?: string
  defaultValue?: any
  validation?: ValidationRules
  options?: Array<{ label: string; value: any }> //** For select fields
  disabled?: boolean
  required?: boolean
}

export interface FormSchema {
  title: string
  description?: string
  fields: FormField[]
}

export interface FormData {
  [fieldId: string]: any
}

export interface FormErrors {
  [fieldId: string]: string[]
}

export interface ValidationResult {
  isValid: boolean
  errors: FormErrors
}
