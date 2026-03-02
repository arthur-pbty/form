"use client"

import { useState } from "react"
import { FormField } from "@/types/form"

interface FormData {
  id: string
  title: string
  description: string | null
  fields: FormField[]
  publicId: string
}

interface Props {
  form: FormData
}

export default function FormResponseClient({ form }: Props) {
  const [responses, setResponses] = useState<Record<string, string | string[]>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (fieldId: string, value: string | string[]) => {
    setResponses((prev) => ({
      ...prev,
      [fieldId]: value,
    }))
  }

  const handleCheckboxChange = (fieldId: string, option: string, checked: boolean) => {
    const currentValues = (responses[fieldId] as string[]) || []
    const newValues = checked
      ? [...currentValues, option]
      : currentValues.filter((v) => v !== option)
    handleInputChange(fieldId, newValues)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Vérifier les champs obligatoires
    const missingRequired = form.fields.filter((field) => {
      if (!field.required) return false
      const value = responses[field.id]
      if (Array.isArray(value)) return value.length === 0
      return !value || value.trim() === ""
    })

    if (missingRequired.length > 0) {
      setError("Veuillez remplir tous les champs obligatoires")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/forms/${form.publicId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: responses }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi")
      }

      setIsSubmitted(true)
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Merci !</h1>
          <p className="text-gray-600">Votre réponse a été enregistrée avec succès.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-8 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{form.title}</h1>
          {form.description && (
            <p className="text-gray-600">{form.description}</p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {form.fields.map((field) => (
              <div key={field.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {field.type === "text" && (
                  <input
                    type="text"
                    value={(responses[field.id] as string) || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                )}

                {field.type === "email" && (
                  <input
                    type="email"
                    value={(responses[field.id] as string) || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                )}

                {field.type === "number" && (
                  <input
                    type="number"
                    value={(responses[field.id] as string) || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                )}

                {field.type === "phone" && (
                  <input
                    type="tel"
                    value={(responses[field.id] as string) || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                )}

                {field.type === "textarea" && (
                  <textarea
                    value={(responses[field.id] as string) || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  />
                )}

                {field.type === "date" && (
                  <input
                    type="date"
                    value={(responses[field.id] as string) || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                )}

                {field.type === "time" && (
                  <input
                    type="time"
                    value={(responses[field.id] as string) || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                )}

                {field.type === "select" && (
                  <select
                    value={(responses[field.id] as string) || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Sélectionnez une option</option>
                    {field.options?.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === "radio" && (
                  <div className="space-y-2">
                    {field.options?.map((option, index) => (
                      <label key={index} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name={field.id}
                          value={option}
                          checked={(responses[field.id] as string) === option}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {field.type === "checkbox" && (
                  <div className="space-y-2">
                    {field.options?.map((option, index) => (
                      <label key={index} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={((responses[field.id] as string[]) || []).includes(option)}
                          onChange={(e) => handleCheckboxChange(field.id, option, e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-6">
              {error}
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                "Envoyer ma réponse"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
