import type { ValidationRules } from '@/types/schema'

export function validateRequired(value: any): string | null {
  if (value === null || value === undefined || value === '') {
    return 'This field is required'
  }
  return null
}

export function validateMinLength(value: string, minLength: number): string | null {
  if (typeof value === 'string' && value.length < minLength) {
    return `Must be at least ${minLength} characters long`
  }
  return null
}

export function validateMaxLength(value: string, maxLength: number): string | null {
  if (typeof value === 'string' && value.length > maxLength) {
    return `Must be no more than ${maxLength} characters long`
  }
  return null
}

export function validatePattern(value: string, pattern: string): string | null {
  if (typeof value === 'string' && value.length > 0) {
    const regex = new RegExp(pattern)
    if (!regex.test(value)) {
      return 'Invalid format'
    }
  }
  return null
}

export function validateEmail(value: string): string | null {
  if (typeof value === 'string' && value.length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
  }
  return null
}

export function validateField(value: any, rules: ValidationRules): string[] {
  const errors: string[] = []

  if (rules.required) {
    const error = validateRequired(value)
    if (error) errors.push(error)
  }

  //** Only validate other rules if the field has a value or is required
  if (value !== null && value !== undefined && value !== '') {
    if (rules.minLength !== undefined) {
      const error = validateMinLength(value, rules.minLength)
      if (error) errors.push(error)
    }

    if (rules.maxLength !== undefined) {
      const error = validateMaxLength(value, rules.maxLength)
      if (error) errors.push(error)
    }

    if (rules.pattern) {
      const error = validatePattern(value, rules.pattern)
      if (error) errors.push(error)
    }

    if (rules.email) {
      const error = validateEmail(value)
      if (error) errors.push(error)
    }

    if (rules.custom) {
      const error = rules.custom(value)
      if (error) errors.push(error)
    }
  }

  return errors
}
