import { LocalStorageForm } from '@/types/form'

export type { LocalStorageForm } from '@/types/form'

const STORAGE_KEY = 'formcraft_my_forms'

export function getMyForms(): LocalStorageForm[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function saveForm(form: LocalStorageForm): void {
  if (typeof window === 'undefined') return
  const forms = getMyForms()
  const existingIndex = forms.findIndex(f => f.publicId === form.publicId)
  
  if (existingIndex >= 0) {
    forms[existingIndex] = form
  } else {
    forms.unshift(form)
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(forms))
}

export function removeForm(publicId: string): void {
  if (typeof window === 'undefined') return
  const forms = getMyForms()
  const filtered = forms.filter(f => f.publicId !== publicId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

export function getFormSecretKey(publicId: string): string | null {
  const forms = getMyForms()
  const form = forms.find(f => f.publicId === publicId)
  return form?.secretKey || null
}
