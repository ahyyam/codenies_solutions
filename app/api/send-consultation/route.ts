import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const data = await req.formData()

    const firstName = String(data.get("firstName") || "")
    const lastName = String(data.get("lastName") || "")
    const email = String(data.get("email") || "")
    const company = String(data.get("company") || "")
    const phone = String(data.get("phone") || "")
    const projectType = String(data.get("projectType") || "")
    const budget = String(data.get("budget") || "")
    const timeline = String(data.get("timeline") || "")
    const description = String(data.get("description") || "")
    const newsletter = data.get("newsletter") ? "Yes" : "No"

    if (!firstName || !lastName || !email || !projectType || !description) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Boolean(process.env.SMTP_SECURE === "true"),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const toAddress = process.env.CONSULTATION_TO || "codenies.solutions@gmail.com"

    const html = `
      <h1>New Consultation Request</h1>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Project Type:</strong> ${projectType}</p>
      <p><strong>Budget:</strong> ${budget}</p>
      <p><strong>Timeline:</strong> ${timeline}</p>
      <p><strong>Newsletter:</strong> ${newsletter}</p>
      <p><strong>Description:</strong><br/>${description.replace(/\n/g, "<br/>")}</p>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `codenies <no-reply@${new URL(req.url).hostname}>`,
      to: toAddress,
      subject: `New Consultation Request: ${projectType} - ${firstName} ${lastName}`,
      replyTo: email,
      html,
    })

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (error) {
    console.error("send-consultation error", error)
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 })
  }
}


