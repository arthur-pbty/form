import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Récupérer les réponses (nécessite la clé secrète)
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ publicId: string }> }
) {
  try {
    const { publicId } = await context.params
    const { searchParams } = new URL(request.url)
    const secretKey = searchParams.get("secret")

    if (!secretKey) {
      return NextResponse.json(
        { error: "Clé secrète requise" },
        { status: 401 }
      )
    }

    const form = await prisma.form.findUnique({
      where: { publicId },
      include: {
        responses: {
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!form) {
      return NextResponse.json(
        { error: "Formulaire non trouvé" },
        { status: 404 }
      )
    }

    // Vérifier la clé secrète
    if (form.secretKey !== secretKey) {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      )
    }

    return NextResponse.json({
      form: {
        id: form.id,
        title: form.title,
        description: form.description,
        fields: JSON.parse(form.fields),
        publicId: form.publicId,
        createdAt: form.createdAt,
      },
      responses: form.responses.map((response) => ({
        id: response.id,
        data: JSON.parse(response.data),
        createdAt: response.createdAt,
      })),
    })
  } catch (error) {
    console.error("Error fetching responses:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des réponses" },
      { status: 500 }
    )
  }
}

// POST - Soumettre une réponse
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ publicId: string }> }
) {
  try {
    const { publicId } = await context.params
    const body = await request.json()
    const { data } = body

    const form = await prisma.form.findUnique({
      where: { publicId },
    })

    if (!form) {
      return NextResponse.json(
        { error: "Formulaire non trouvé" },
        { status: 404 }
      )
    }

    const response = await prisma.response.create({
      data: {
        formId: form.id,
        data: JSON.stringify(data),
      },
    })

    return NextResponse.json({
      success: true,
      responseId: response.id,
    })
  } catch (error) {
    console.error("Error submitting response:", error)
    return NextResponse.json(
      { error: "Erreur lors de la soumission de la réponse" },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer le formulaire (nécessite la clé secrète)
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ publicId: string }> }
) {
  try {
    const { publicId } = await context.params
    const { searchParams } = new URL(request.url)
    const secretKey = searchParams.get("secret")

    if (!secretKey) {
      return NextResponse.json(
        { error: "Clé secrète requise" },
        { status: 401 }
      )
    }

    const form = await prisma.form.findUnique({
      where: { publicId },
    })

    if (!form) {
      return NextResponse.json(
        { error: "Formulaire non trouvé" },
        { status: 404 }
      )
    }

    if (form.secretKey !== secretKey) {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      )
    }

    await prisma.form.delete({
      where: { publicId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting form:", error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression du formulaire" },
      { status: 500 }
    )
  }
}
