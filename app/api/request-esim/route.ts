import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, reservation } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Send notification to admin
    const { data, error } = await resend.emails.send({
      from: "Jordan Explorer <onboarding@resend.dev>",
      to: "info@exploringjordan.com",
      subject: `E-SIM Request - ${reservation}`,
      html: `
        <h2>New E-SIM Request</h2>
        <p><strong>Reservation:</strong> ${reservation}</p>
        <p><strong>Guest Email:</strong> ${email}</p>
        <p><strong>Package:</strong> 5-Star Luxury Package (3 travelers)</p>
        <p>Please send E-SIM activation instructions to the guest after payment confirmation.</p>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error processing E-SIM request:", error)
    return NextResponse.json({ error: "Failed to process E-SIM request" }, { status: 500 })
  }
}
