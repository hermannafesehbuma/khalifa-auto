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
      income,
      creditScore,
      downPayment,
      loanAmount,
      employmentStatus,
      additionalInfo,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const emailData = emailTemplates.financingApplication({
      firstName,
      lastName,
      email,
      phone,
      income: income || 'Not provided',
      creditScore: creditScore || 'Not provided',
      downPayment: downPayment || 'Not provided',
      loanAmount: loanAmount || 'Not provided',
      employmentStatus: employmentStatus || 'Not provided',
      additionalInfo: additionalInfo || '',
    });

    const result = await resend.emails.send(emailData);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Financing application submitted successfully',
        emailId: result.data?.id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Financing application error:', error);
    return NextResponse.json(
      { error: 'Failed to send financing application' },
      { status: 500 }
    );
  }
}
