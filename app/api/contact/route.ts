import { NextRequest, NextResponse } from 'next/server';
import { resend, emailTemplates } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const emailData = emailTemplates.contactForm({
      name,
      email,
      phone: phone || 'Not provided',
      subject,
      message,
    });

    const result = await resend.emails.send(emailData);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        emailId: result.data?.id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send contact form' },
      { status: 500 }
    );
  }
}
