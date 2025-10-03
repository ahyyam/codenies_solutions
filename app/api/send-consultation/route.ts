import nodemailer from "nodemailer"

// Sanitize HTML to prevent XSS attacks
function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate input length to prevent abuse
const MAX_FIELD_LENGTH = 500
const MAX_DESCRIPTION_LENGTH = 2000

function validateInput(input: string, maxLength: number, fieldName: string): string {
  if (input.length > maxLength) {
    throw new Error(`${fieldName} exceeds maximum length of ${maxLength} characters`)
  }
  return input.trim()
}

export async function POST(req: Request) {
  try {
    const data = await req.formData()

    const firstName = validateInput(String(data.get("firstName") || ""), MAX_FIELD_LENGTH, "First name")
    const lastName = validateInput(String(data.get("lastName") || ""), MAX_FIELD_LENGTH, "Last name")
    const emailRaw = String(data.get("email") || "")
    const email = validateInput(emailRaw, MAX_FIELD_LENGTH, "Email")
    const company = validateInput(String(data.get("company") || ""), MAX_FIELD_LENGTH, "Company")
    const phone = validateInput(String(data.get("phone") || ""), MAX_FIELD_LENGTH, "Phone")
    const projectType = validateInput(String(data.get("projectType") || ""), MAX_FIELD_LENGTH, "Project type")
    const budget = validateInput(String(data.get("budget") || ""), MAX_FIELD_LENGTH, "Budget")
    const timeline = validateInput(String(data.get("timeline") || ""), MAX_FIELD_LENGTH, "Timeline")
    const description = validateInput(String(data.get("description") || ""), MAX_DESCRIPTION_LENGTH, "Description")
    const newsletter = data.get("newsletter") ? "Yes" : "No"

    if (!firstName || !lastName || !email || !projectType || !description) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
    }

    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), { status: 400 })
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
      <p><strong>Name:</strong> ${sanitizeHtml(firstName)} ${sanitizeHtml(lastName)}</p>
      <p><strong>Email:</strong> ${sanitizeHtml(email)}</p>
      <p><strong>Company:</strong> ${sanitizeHtml(company)}</p>
      <p><strong>Phone:</strong> ${sanitizeHtml(phone)}</p>
      <p><strong>Project Type:</strong> ${sanitizeHtml(projectType)}</p>
      <p><strong>Budget:</strong> ${sanitizeHtml(budget)}</p>
      <p><strong>Timeline:</strong> ${sanitizeHtml(timeline)}</p>
      <p><strong>Newsletter:</strong> ${newsletter}</p>
      <p><strong>Description:</strong><br/>${sanitizeHtml(description).replace(/\n/g, "<br/>")}</p>
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


