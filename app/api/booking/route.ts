import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const {
            name,
            email,
            phone,
            message,
            tourTitle,
            pricePerPerson,
            totalPrice,
            groupSize,
            startDate,
            season,
            duration,
            hotelClass,
            country,
            specialRequests,
        } = body

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
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #2563eb; color: white; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">New Booking Request</h2>
              <p style="margin: 5px 0 0; opacity: 0.9;">${tourTitle || "General Inquiry"}</p>
            </div>
            
            <div style="padding: 20px;">
              <h3 style="color: #333; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-top: 0;">Customer Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 40%;"><strong>Name:</strong></td>
                  <td style="padding: 8px 0; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                  <td style="padding: 8px 0; color: #333;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td>
                  <td style="padding: 8px 0; color: #333;"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Country:</strong></td>
                  <td style="padding: 8px 0; color: #333;">${country || "Not specified"}</td>
                </tr>
              </table>

              <h3 style="color: #333; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-top: 25px;">Trip Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Tour:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${tourTitle || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Departure Date:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${startDate}</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Duration:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${duration} Days</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Season:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${season} Season</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Group Size:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${groupSize} People</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Hotel Class:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${hotelClass}</td>
                </tr>
              </table>

              <h3 style="color: #333; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-top: 25px;">Pricing Summary</h3>
              <table style="width: 100%; border-collapse: collapse; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px;">
                <tr>
                  <td style="padding: 12px; color: #166534;"><strong>Price Per Person:</strong></td>
                  <td style="padding: 12px; color: #166534; text-align: right;">$${pricePerPerson}</td>
                </tr>
                <tr style="border-top: 1px solid #bbf7d0;">
                  <td style="padding: 12px; color: #15803d; font-size: 1.1em;"><strong>TOTAL ESTIMATED COST:</strong></td>
                  <td style="padding: 12px; color: #15803d; text-align: right; font-size: 1.2em; font-weight: bold;">$${totalPrice}</td>
                </tr>
              </table>

              ${specialRequests
                        ? `
              <h3 style="color: #333; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-top: 25px;">Special Requests</h3>
              <div style="background-color: #fffbeb; padding: 15px; border-radius: 5px; border: 1px solid #fcd34d; color: #92400e;">
                ${specialRequests}
              </div>
              `
                        : ""
                    }
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
                <p>This email was sent from the Jordan Explorer website booking form.</p>
              </div>
            </div>
          </div>
        `,
            })

            console.log("Email sent successfully:", data)
            return NextResponse.json({ success: true, message: "Booking request sent successfully" })
        } catch (emailError) {
            console.error("Resend Email Error:", emailError)
            return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 })
        }
    } catch (error) {
        console.error("Booking API Error:", error)
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
    }
}

