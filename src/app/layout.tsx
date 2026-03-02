import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "FormCraft - Créez vos formulaires gratuitement | Alternative à Google Forms",
    template: "%s | FormCraft"
  },
  description: "Créez des formulaires professionnels gratuitement en quelques clics avec FormCraft. Partagez-les via un lien unique, collectez et analysez les réponses instantanément. Sans inscription requise. Alternative française à Google Forms.",
  keywords: [
    "formulaire en ligne", "créer formulaire gratuit", "questionnaire en ligne",
    "sondage gratuit", "enquête en ligne", "Google Forms alternative",
    "formulaire sans inscription", "collecte de données", "formulaire français",
    "créateur de formulaires", "partager formulaire", "formulaire professionnel",
  ],
  authors: [{ name: "FormCraft", url: "https://form.arthurp.fr" }],
  creator: "FormCraft",
  publisher: "FormCraft",
  metadataBase: new URL("https://form.arthurp.fr"),
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://form.arthurp.fr",
    siteName: "FormCraft",
    title: "FormCraft - Créez vos formulaires gratuitement",
    description: "Créez des formulaires professionnels, partagez-les et collectez les réponses instantanément. Gratuit et sans inscription.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FormCraft - Créateur de formulaires en ligne gratuit",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FormCraft - Créez vos formulaires gratuitement",
    description: "Créez des formulaires professionnels, partagez-les et collectez les réponses instantanément. Gratuit et sans inscription.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  classification: "Web Application",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FormCraft",
  url: "https://form.arthurp.fr",
  description:
    "Créez des formulaires professionnels gratuitement en quelques clics. Partagez-les via un lien unique et collectez les réponses instantanément.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  inLanguage: "fr-FR",
  creator: {
    "@type": "Organization",
    name: "FormCraft",
    url: "https://form.arthurp.fr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50 min-h-screen`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
        >
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content" className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
