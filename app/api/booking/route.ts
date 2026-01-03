import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, phone, message, tourTitle } = body

        // Validate required fields
        if (!name || !email || !phone) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
        }

        try {
            const data = await resend.emails.send({
                from: "Jordan Explorer <bookings@exploringjordan.com>",
                to: ["mohammed.mutlak.camp@gmail.com"], // Admin email
                replyTo: email,
                subject: `New Booking Request: ${tourTitle || "General Inquiry"}`,
                html: `
          <h2>New Booking Request</h2>
          <p><strong>Tour:</strong> ${tourTitle || "Not specified"}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          
          <h3>Booking Details:</h3>
          <pre style="font-family: sans-serif; background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</pre>
        `,
            })

            console.log("Email sent successfully:", data)
            return NextResponse.json({ success: true, message: "Booking request sent successfully" })
        } catch (emailError) {
            console.error("Resend Email Error:", emailError)
            // Fallback or just log error but return success to user if you want to avoid blocking them,
            // but better to fail so they know.
            return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 })
        }
    } catch (error) {
        console.error("Booking API Error:", error)
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
    }
}
