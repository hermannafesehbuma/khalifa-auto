import { NextRequest, NextResponse } from 'next/server';
import { resend, emailTemplates } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      year,
      make,
      model,
      mileage,
      condition,
      vin,
      additionalInfo,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !year || !make || !model) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const emailData = emailTemplates.tradeInForm({
      firstName,
      lastName,
      email,
      phone,
      year,
      make,
      model,
      mileage: mileage || 'Not provided',
      condition: condition || 'Not provided',
      vin: vin || 'Not provided',
      additionalInfo: additionalInfo || '',
    });

    const result = await resend.emails.send(emailData);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Trade-in request submitted successfully',
        emailId: result.data?.id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Trade-in form error:', error);
    return NextResponse.json(
      { error: 'Failed to send trade-in request' },
      { status: 500 }
    );
  }
}
