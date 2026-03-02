"use client"

import { FormField } from "@/types/form"

interface FieldEditorProps {
  field: FormField
  index: number
  totalFields: number
  onUpdate: (updates: Partial<FormField>) => void
  onRemove: () => void
  onMove: (direction: "up" | "down") => void
}

export default function FieldEditor({
  field,
  index,
  totalFields,
  onUpdate,
  onRemove,
  onMove,
}: FieldEditorProps) {
  const hasOptions = field.type === "select" || field.type === "radio" || field.type === "checkbox"

  const addOption = () => {
    const newOptions = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`]
    onUpdate({ options: newOptions })
  }

  const updateOption = (optionIndex: number, value: string) => {
    const newOptions = [...(field.options || [])]
    newOptions[optionIndex] = value
    onUpdate({ options: newOptions })
  }

  const removeOption = (optionIndex: number) => {
    const newOptions = (field.options || []).filter((_, i) => i !== optionIndex)
    onUpdate({ options: newOptions })
  }

  const getFieldTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      text: "Texte court",
      textarea: "Texte long",
      email: "Email",
      number: "Nombre",
      phone: "Téléphone",
      date: "Date",
      time: "Heure",
      select: "Liste déroulante",
      radio: "Choix unique",
      checkbox: "Choix multiple",
    }
    return labels[type] || type
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-3">
          <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-lg text-xs sm:text-sm font-semibold">
            {index + 1}
          </span>
          <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
            {getFieldTypeLabel(field.type)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onMove("up")}
            disabled={index === 0}
            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Monter"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={() => onMove("down")}
            disabled={index === totalFields - 1}
            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Descendre"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button
            onClick={onRemove}
            className="p-2 text-red-400 hover:text-red-600"
            title="Supprimer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question / Libellé *
          </label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
            placeholder="Ex: Quel est votre nom ?"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        {(field.type === "text" || field.type === "textarea" || field.type === "email" || field.type === "number" || field.type === "phone") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Placeholder (optionnel)
            </label>
            <input
              type="text"
              value={field.placeholder || ""}
              onChange={(e) => onUpdate({ placeholder: e.target.value })}
              placeholder="Texte d'aide affiché dans le champ"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        )}

        {hasOptions && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Options
            </label>
            <div className="space-y-2">
              {(field.options || []).map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(optionIndex, e.target.value)}
                    placeholder={`Option ${optionIndex + 1}`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                  {(field.options?.length || 0) > 1 && (
                    <button
                      onClick={() => removeOption(optionIndex)}
                      className="p-2 text-red-400 hover:text-red-600"
                      title="Supprimer l'option"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addOption}
                className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Ajouter une option
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center">
          <input
            type="checkbox"
            id={`required-${field.id}`}
            checked={field.required}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor={`required-${field.id}`} className="ml-2 text-sm text-gray-700">
            Champ obligatoire
          </label>
        </div>
      </div>
    </div>
  )
}
