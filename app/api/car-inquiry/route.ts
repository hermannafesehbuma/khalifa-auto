import { NextRequest, NextResponse } from 'next/server';
import { resend, emailTemplates } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, carInfo, message } = body;

    // Validate required fields
    if (!name || !email || !carInfo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const emailData = emailTemplates.carInquiry({
      name,
      email,
      phone: phone || 'Not provided',
      carInfo,
      message: message || 'No additional message provided',
    });

    const result = await resend.emails.send(emailData);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Car inquiry submitted successfully',
        emailId: result.data?.id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Car inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to send car inquiry' },
      { status: 500 }
    );
  }
}
