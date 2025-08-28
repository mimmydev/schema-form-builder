import type { Component } from 'vue'
import type { FormField } from '@/types/schema'

//** Field registry to store field components
const fieldRegistry = new Map<string, Component>()

//** Register a field component
export function registerField(type: string, component: Component) {
  fieldRegistry.set(type, component)
}

//** Get a field component by type
export function getFieldComponent(type: string): Component | undefined {
  return fieldRegistry.get(type)
}

//** Get all registered field types
export function getRegisteredFieldTypes(): string[] {
  return Array.from(fieldRegistry.keys())
}

//** Check if a field type is registered
export function isFieldTypeRegistered(type: string): boolean {
  return fieldRegistry.has(type)
}

//** Clear all registered fields (useful for testing)
export function clearFieldRegistry() {
  fieldRegistry.clear()
}

//** Default field component props interface
export interface FieldComponentProps {
  field: FormField
  modelValue: any
  errors: string[]
  disabled?: boolean
}

//** Field component emits interface
export interface FieldComponentEmits {
  'update:modelValue': [value: any]
  'blur': []
  'focus': []
}
