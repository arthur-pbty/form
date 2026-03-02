import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "FormCraft - Créez vos formulaires gratuitement | Alternative à Google Forms",
  description:
    "Créez des formulaires professionnels gratuitement en quelques clics avec FormCraft. Partagez-les via un lien unique, collectez et analysez les réponses instantanément. Sans inscription requise.",
  alternates: {
    canonical: "https://form.arthurp.fr",
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Comment créer un formulaire avec FormCraft ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ajoutez vos questions, personnalisez votre formulaire, puis copiez le lien unique généré automatiquement pour le partager.",
      },
    },
    {
      "@type": "Question",
      name: "Est-ce que FormCraft est gratuit ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, FormCraft est entièrement gratuit et ne nécessite aucune inscription.",
      },
    },
    {
      "@type": "Question",
      name: "FormCraft est-il une alternative à Google Forms ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, FormCraft est une alternative française et gratuite à Google Forms, sans inscription requise.",
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="min-h-screen bg-linear-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20" aria-labelledby="hero-title">
        <div className="text-center">
          <h1 id="hero-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            Créez vos formulaires
            <span className="text-blue-600"> facilement</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Concevez des formulaires professionnels en quelques clics. 
            Partagez-les avec un simple lien et collectez les réponses instantanément.
            <strong className="text-gray-900"> Sans inscription requise.</strong>
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Link 
              href="/creer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Créer un formulaire
            </Link>
            <Link 
              href="/mes-formulaires"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Voir mes formulaires
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20" aria-labelledby="features-title">
        <h2 id="features-title" className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          Pourquoi choisir FormCraft ?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <FeatureCard 
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            title="Rapide et simple"
            description="Créez votre formulaire en quelques minutes. Interface intuitive, sans courbe d'apprentissage."
          />
          <FeatureCard 
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
            title="Sécurisé"
            description="Vos données sont protégées. Seul vous pouvez accéder aux réponses de vos formulaires."
          />
          <FeatureCard 
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            }
            title="Partage facile"
            description="Obtenez un lien unique pour partager votre formulaire. Collectez des réponses instantanément."
          />
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-12 sm:py-16 lg:py-20" aria-labelledby="howto-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="howto-title" className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Comment ça marche ?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <StepCard 
              number={1}
              title="Créez"
              description="Ajoutez vos questions et personnalisez votre formulaire"
            />
            <StepCard 
              number={2}
              title="Partagez"
              description="Copiez le lien unique généré automatiquement"
            />
            <StepCard 
              number={3}
              title="Collectez"
              description="Recevez les réponses en temps réel"
            />
            <StepCard 
              number={4}
              title="Analysez"
              description="Consultez et exportez vos données facilement"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20" aria-labelledby="cta-title">
        <div className="bg-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center">
          <h2 id="cta-title" className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
            Prêt à créer votre premier formulaire ?
          </h2>
          <p className="text-blue-100 text-base sm:text-lg mb-6 sm:mb-8">
            C&apos;est gratuit, rapide et sans inscription.
          </p>
          <Link 
            href="/creer"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition-colors"
          >
            Commencer maintenant
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 sm:py-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center" aria-hidden="true">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">FormCraft</span>
            </div>
            <p className="text-sm">
              © {new Date().getFullYear()} FormCraft. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <article className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 sm:mb-6" aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600">{description}</p>
    </article>
  )
}

function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <article className="text-center">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4" aria-hidden="true">
        {number}
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Étape {number} : {title}</h3>
      <p className="text-gray-600 text-xs sm:text-sm">{description}</p>
    </article>
  )
}
