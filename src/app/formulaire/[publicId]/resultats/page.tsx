"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense, use } from "react"
import { FormField } from "@/types/form"
import Link from "next/link"

interface FormData {
  id: string
  title: string
  description: string | null
  fields: FormField[]
  publicId: string
  createdAt: string
}

interface Response {
  id: string
  data: Record<string, string | string[]>
  createdAt: string
}

function ResultsContent({ publicId }: { publicId: string }) {
  const searchParams = useSearchParams()
  const secretKey = searchParams.get("secret")
  
  const [form, setForm] = useState<FormData | null>(null)
  const [responses, setResponses] = useState<Response[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!secretKey) {
        setError("Clé secrète manquante. Vous n'avez pas accès aux résultats.")
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/forms/${publicId}?secret=${secretKey}`)
        
        if (response.status === 403) {
          setError("Accès non autorisé. Clé secrète invalide.")
          setLoading(false)
          return
        }

        if (response.status === 404) {
          setError("Formulaire non trouvé.")
          setLoading(false)
          return
        }

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données")
        }

        const data = await response.json()
        setForm(data.form)
        setResponses(data.responses)
      } catch {
        setError("Une erreur est survenue lors de la récupération des données.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [publicId, secretKey])

  const copyShareLink = async () => {
    const shareUrl = typeof window !== "undefined" 
      ? `${window.location.origin}/formulaire/${publicId}`
      : `/formulaire/${publicId}`
    
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const exportToCSV = () => {
    if (!form || responses.length === 0) return

    const headers = ["Date", ...form.fields.map(f => f.label)]
    const rows = responses.map(response => {
      const date = new Date(response.createdAt).toLocaleString("fr-FR")
      const values = form.fields.map(field => {
        const value = response.data[field.id]
        if (Array.isArray(value)) return value.join(", ")
        return value || ""
      })
      return [date, ...values]
    })

    const csvContent = [
      headers.map(h => `"${h}"`).join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `${form.title.replace(/[^a-z0-9]/gi, "_")}_reponses.csv`
    link.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Accès refusé</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    )
  }

  if (!form) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{form.title}</h1>
              {form.description && (
                <p className="text-gray-600 mt-1">{form.description}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                {responses.length} réponse{responses.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={copyShareLink}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center text-sm font-medium"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copié !
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Partager
                  </>
                )}
              </button>
              {responses.length > 0 && (
                <button
                  onClick={exportToCSV}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm font-medium"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Exporter CSV
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Réponses */}
        {responses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Aucune réponse pour le moment</h2>
            <p className="text-gray-600">Partagez le lien de votre formulaire pour commencer à collecter des réponses.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {responses.map((response, index) => (
              <div key={response.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-4">
                  <span className="text-sm font-medium text-gray-500">
                    Réponse #{responses.length - index}
                  </span>
                  <span className="text-sm text-gray-400">
                    {new Date(response.createdAt).toLocaleString("fr-FR")}
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {form.fields.map((field) => (
                    <div key={field.id} className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-500 mb-1">{field.label}</p>
                      <p className="text-gray-900">
                        {Array.isArray(response.data[field.id])
                          ? (response.data[field.id] as string[]).join(", ") || "-"
                          : response.data[field.id] || "-"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ResultsPage({ params }: { params: Promise<{ publicId: string }> }) {
  const { publicId } = use(params)

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ResultsContent publicId={publicId} />
    </Suspense>
  )
}
