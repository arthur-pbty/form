// Types pour les formulaires

export type FieldType = 
  | 'text'
  | 'email'
  | 'number'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'time'
  | 'phone'

export interface FormField {
  id: string
  type: FieldType
  label: string
  placeholder?: string
  required: boolean
  options?: string[] // Pour select, radio, checkbox
}

export interface FormData {
  id: string
  title: string
  description?: string
  fields: FormField[]
  secretKey: string
  publicId: string
  createdAt: string
  updatedAt: string
}

export interface FormResponse {
  id: string
  formId: string
  data: Record<string, string | string[]>
  createdAt: string
}

export interface LocalStorageForm {
  publicId: string
  secretKey: string
  title: string
  createdAt: string
}
