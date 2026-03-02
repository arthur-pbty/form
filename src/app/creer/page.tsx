"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import { FormField, FieldType } from "@/types/form"
import { saveForm } from "@/lib/localStorage"
import FieldEditor from "@/components/FieldEditor"

const fieldTypes: { type: FieldType; label: string; icon: React.ReactNode }[] = [
  { 
    type: "text", 
    label: "Texte court",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" /></svg>
  },
  { 
    type: "textarea", 
    label: "Texte long",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
  },
  { 
    type: "email", 
    label: "Email",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  },
  { 
    type: "number", 
    label: "Nombre",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
  },
  { 
    type: "phone", 
    label: "Téléphone",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
  },
  { 
    type: "date", 
    label: "Date",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
  },
  { 
    type: "time", 
    label: "Heure",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  },
  { 
    type: "select", 
    label: "Liste déroulante",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
  },
  { 
    type: "radio", 
    label: "Choix unique",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth={2} /><circle cx="12" cy="12" r="4" fill="currentColor" /></svg>
  },
  { 
    type: "checkbox", 
    label: "Choix multiple",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  },
]

export default function CreateFormPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [fields, setFields] = useState<FormField[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: uuidv4(),
      type,
      label: "",
      placeholder: "",
      required: false,
      options: type === "select" || type === "radio" || type === "checkbox" ? ["Option 1"] : undefined,
    }
    setFields([...fields, newField])
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ))
  }

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id))
  }

  const moveField = (id: string, direction: "up" | "down") => {
    const index = fields.findIndex(field => field.id === id)
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === fields.length - 1)
    ) return

    const newFields = [...fields]
    const swapIndex = direction === "up" ? index - 1 : index + 1
    ;[newFields[index], newFields[swapIndex]] = [newFields[swapIndex], newFields[index]]
    setFields(newFields)
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Veuillez entrer un titre pour votre formulaire")
      return
    }

    if (fields.length === 0) {
      setError("Veuillez ajouter au moins un champ à votre formulaire")
      return
    }

    const emptyLabels = fields.some(field => !field.label.trim())
    if (emptyLabels) {
      setError("Veuillez remplir le libellé de tous les champs")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, fields }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la création du formulaire")
      }

      const data = await response.json()
      
      // Sauvegarder dans le localStorage
      saveForm({
        publicId: data.publicId,
        secretKey: data.secretKey,
        title: title,
        createdAt: new Date().toISOString(),
      })

      router.push(`/formulaire/${data.publicId}/succes?secret=${data.secretKey}`)
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Créer un formulaire</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">Ajoutez des champs et personnalisez votre formulaire</p>
        </div>

        {/* Titre et description */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Titre du formulaire *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Formulaire d'inscription"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description (optionnel)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez votre formulaire..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Ajouter des champs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ajouter un champ</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {fieldTypes.map((fieldType) => (
              <button
                key={fieldType.type}
                onClick={() => addField(fieldType.type)}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
              >
                <div className="text-gray-500 group-hover:text-blue-600 mb-2">
                  {fieldType.icon}
                </div>
                <span className="text-sm text-gray-700 group-hover:text-blue-700 text-center">
                  {fieldType.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Liste des champs */}
        {fields.length > 0 && (
          <div className="space-y-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Champs du formulaire</h2>
            {fields.map((field, index) => (
              <FieldEditor
                key={field.id}
                field={field}
                index={index}
                totalFields={fields.length}
                onUpdate={(updates) => updateField(field.id, updates)}
                onRemove={() => removeField(field.id)}
                onMove={(direction) => moveField(field.id, direction)}
              />
            ))}
          </div>
        )}

        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Bouton de soumission */}
        <div className="flex">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full sm:w-auto sm:ml-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Création en cours...
              </>
            ) : (
              <>
                Créer le formulaire
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
