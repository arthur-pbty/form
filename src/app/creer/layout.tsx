import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Créer un formulaire gratuit en ligne",
  description: "Créez votre formulaire personnalisé en quelques clics. Ajoutez des champs texte, email, sélection et plus. Partagez votre formulaire instantanément avec un lien unique. Gratuit et sans inscription.",
  alternates: {
    canonical: "https://form.arthurp.fr/creer",
  },
  openGraph: {
    title: "Créer un formulaire gratuit | FormCraft",
    description: "Créez votre formulaire personnalisé en quelques clics et partagez-le instantanément.",
    url: "https://form.arthurp.fr/creer",
  },
}

export default function CreerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
