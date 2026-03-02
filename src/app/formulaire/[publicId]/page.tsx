import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import FormResponseClient from "./FormResponseClient"

interface Props {
  params: Promise<{ publicId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { publicId } = await params
  const form = await prisma.form.findUnique({
    where: { publicId },
    select: { title: true, description: true },
  })

  if (!form) {
    return {
      title: "Formulaire non trouvé",
    }
  }

  return {
    title: form.title,
    description: form.description || `Répondez au formulaire "${form.title}"`,
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function FormResponsePage({ params }: Props) {
  const { publicId } = await params
  
  const form = await prisma.form.findUnique({
    where: { publicId },
    select: {
      id: true,
      title: true,
      description: true,
      fields: true,
      publicId: true,
    },
  })

  if (!form) {
    notFound()
  }

  const formData = {
    ...form,
    fields: JSON.parse(form.fields),
  }

  return <FormResponseClient form={formData} />
}
