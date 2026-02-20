import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { companyName, contactName, email, phone, website, country, agencySize, message } = body

    await resend.emails.send({
      from: "Exploring Jordan <noreply@exploringjordan.com>",
      to: ["info@exploringjordan.com"],
      replyTo: email,
      subject: `🤝 New Partner Inquiry: ${companyName} (${country})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #92400e;">New Partnership Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Company</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${companyName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Contact</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${contactName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || "Not provided"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Website</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${website || "Not provided"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Country</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${country}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Annual Volume</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${agencySize || "Not specified"}</td></tr>
          </table>
          ${message ? `<h3 style="color: #92400e; margin-top: 20px;">Message</h3><p>${message}</p>` : ""}
          <hr style="margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">This inquiry was submitted via the Partners page on exploringjordan.com</p>
        </div>
      `,
    })

    // Also send a confirmation to the agency
    await resend.emails.send({
      from: "Exploring Jordan <noreply@exploringjordan.com>",
      to: [email],
      subject: "Thank you for your partnership inquiry — Exploring Jordan",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #92400e;">Thank You, ${contactName}!</h2>
          <p>We've received your partnership inquiry for <strong>${companyName}</strong>.</p>
          <p>Our team will review your details and send you our <strong>B2B rate sheet</strong> within 24 hours.</p>
          <p>In the meantime, feel free to explore our tour programs at <a href="https://www.exploringjordan.com/tours">exploringjordan.com/tours</a>.</p>
          <br/>
          <p>Best regards,<br/>The Exploring Jordan Team</p>
          <p><a href="https://www.exploringjordan.com">www.exploringjordan.com</a> | <a href="mailto:info@exploringjordan.com">info@exploringjordan.com</a></p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Partner inquiry error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to send inquiry" },
      { status: 500 }
    )
  }
}
