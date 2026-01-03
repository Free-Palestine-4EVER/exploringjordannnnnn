import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, phone, message, tourTitle } = body

        // Log the submission (simulating email sending)
        console.log("Contact Form Submission:", {
            to: "mohammed.mutlak.camp@gmail.com",
            subject: `New Inquiry for: ${tourTitle}`,
            from: email,
            content: `
        Name: ${name}
        Phone: ${phone}
        Tour: ${tourTitle}
        Message: ${message}
      `
        })

        // In a real application, you would use an email service like Resend, SendGrid, or nodemailer here.
        // Example with nodemailer (commented out):
        /*
        const transporter = nodemailer.createTransport({ ... });
        await transporter.sendMail({
          from: '"Website Inquiry" <noreply@jordanexplorer.com>',
          to: "info@exploringjordan.com",
          subject: `New Tour Inquiry: ${tourTitle} - ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
          html: `...`
        });
        */

        return NextResponse.json({ success: true, message: "Email sent successfully" })
    } catch (error) {
        console.error("Contact API Error:", error)
        return NextResponse.json(
            { success: false, message: "Failed to send message" },
            { status: 500 }
        )
    }
}
