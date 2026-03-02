export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center" role="status" aria-label="Chargement en cours">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" aria-hidden="true"></div>
        <p className="mt-4 text-gray-600">Chargement...</p>
      </div>
    </div>
  )
}
