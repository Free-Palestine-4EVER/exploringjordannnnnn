import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("passports") as File[]

    if (files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 })
    }

    // Convert files to attachments for Resend
    const attachments = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        return {
          filename: file.name,
          content: buffer,
        }
      }),
    )

    // Send email with attachments via Resend
    const { data, error } = await resend.emails.send({
      from: "Jordan Explorer <onboarding@resend.dev>",
      to: "info@exploringjordan.com",
      subject: "Passport Upload - LET-DEC-2025",
      html: `
        <h2>New Passport Upload</h2>
        <p><strong>Reservation:</strong> LET-DEC-2025</p>
        <p><strong>Guest:</strong> Leticia (3 travelers)</p>
        <p><strong>Number of files:</strong> ${files.length}</p>
        <p>Please process the visa for this booking.</p>
      `,
      attachments,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error uploading passports:", error)
    return NextResponse.json({ error: "Failed to upload passports" }, { status: 500 })
  }
}
