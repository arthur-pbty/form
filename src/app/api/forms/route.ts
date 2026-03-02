import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { v4 as uuidv4 } from "uuid"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, fields } = body

    if (!title || !fields || fields.length === 0) {
      return NextResponse.json(
        { error: "Titre et champs requis" },
        { status: 400 }
      )
    }

    const publicId = uuidv4().slice(0, 8) // ID court pour l'URL publique
    const secretKey = crypto.randomBytes(32).toString("hex") // Clé secrète longue

    const form = await prisma.form.create({
      data: {
        title,
        description: description || null,
        fields: JSON.stringify(fields),
        publicId,
        secretKey,
      },
    })

    return NextResponse.json({
      id: form.id,
      publicId: form.publicId,
      secretKey: form.secretKey,
    })
  } catch (error) {
    console.error("Error creating form:", error)
    return NextResponse.json(
      { error: "Erreur lors de la création du formulaire" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const publicId = searchParams.get("publicId")

    if (!publicId) {
      return NextResponse.json(
        { error: "ID public requis" },
        { status: 400 }
      )
    }

    const form = await prisma.form.findUnique({
      where: { publicId },
      select: {
        id: true,
        title: true,
        description: true,
        fields: true,
        publicId: true,
        createdAt: true,
      },
    })

    if (!form) {
      return NextResponse.json(
        { error: "Formulaire non trouvé" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ...form,
      fields: JSON.parse(form.fields),
    })
  } catch (error) {
    console.error("Error fetching form:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération du formulaire" },
      { status: 500 }
    )
  }
}
