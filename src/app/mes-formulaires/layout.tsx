import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mes formulaires - Gérer et consulter",
  description: "Retrouvez et gérez tous vos formulaires créés avec FormCraft. Consultez les réponses, partagez vos formulaires et exportez vos données facilement.",
  alternates: {
    canonical: "https://form.arthurp.fr/mes-formulaires",
  },
  openGraph: {
    title: "Mes formulaires | FormCraft",
    description: "Gérez tous vos formulaires, consultez les réponses et exportez vos données.",
    url: "https://form.arthurp.fr/mes-formulaires",
  },
}

export default function MesFormulairesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
