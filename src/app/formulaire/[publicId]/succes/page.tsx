"use client"

import { useSearchParams } from "next/navigation"
import { useState, Suspense, useEffect, use } from "react"
import Link from "next/link"

function SuccessContent({ publicId }: { publicId: string }) {
  const searchParams = useSearchParams()
  const secretKey = searchParams.get("secret")
  const [copied, setCopied] = useState<"link" | "admin" | null>(null)

  const formUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/formulaire/${publicId}`
    : `/formulaire/${publicId}`
  
  const adminUrl = typeof window !== "undefined"
    ? `${window.location.origin}/formulaire/${publicId}/resultats?secret=${secretKey}`
    : `/formulaire/${publicId}/resultats?secret=${secretKey}`

  const copyToClipboard = async (text: string, type: "link" | "admin") => {
    await navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 text-center mb-6 sm:mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Formulaire créé !</h1>
          <p className="text-gray-600">Votre formulaire est prêt à être partagé.</p>
        </div>

        <div className="space-y-6">
          {/* Lien de partage */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Lien de partage</h2>
            <p className="text-sm text-gray-600 mb-4">
              Partagez ce lien pour permettre aux gens de répondre à votre formulaire.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                readOnly
                value={formUrl}
                className="flex-1 min-w-0 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm truncate"
              />
              <button
                onClick={() => copyToClipboard(formUrl, "link")}
                className="w-full sm:w-auto px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center shrink-0"
              >
                {copied === "link" ? (
                  <>
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copié
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copier
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Lien admin */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Accès aux résultats</h2>
            <p className="text-sm text-gray-600 mb-4">
              <strong className="text-red-600">Important :</strong> Ce lien est privé et vous permet de voir les réponses. 
              Ne le partagez pas !
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                readOnly
                value={adminUrl}
                className="flex-1 min-w-0 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm truncate"
              />
              <button
                onClick={() => copyToClipboard(adminUrl, "admin")}
                className="w-full sm:w-auto px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center shrink-0"
              >
                {copied === "admin" ? (
                  <>
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copié
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copier
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/formulaire/${publicId}`}
              className="flex-1 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center font-medium"
            >
              Voir le formulaire
            </Link>
            <Link
              href={`/formulaire/${publicId}/resultats?secret=${secretKey}`}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
            >
              Voir les résultats
            </Link>
          </div>

          <div className="text-center">
            <Link
              href="/creer"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Créer un autre formulaire
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage({ params }: { params: Promise<{ publicId: string }> }) {
  const { publicId } = use(params)

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <SuccessContent publicId={publicId} />
    </Suspense>
  )
}
