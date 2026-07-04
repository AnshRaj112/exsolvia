import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Application from '@/models/Application';
import { requireAdminSession } from '@/lib/admin-auth';

const MAX_MESSAGE = 2500;

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const {
      name,
      email,
      phone,
      position,
      resume,
      coverLetter,
      portfolio,
      linkedin,
      github,
      message,
    } = body;

    if (!name || !email || !position) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and position are required' },
        { status: 400 }
      );
    }

    const resumeStr = resume != null ? String(resume).trim() : '';
    const portfolioStr = portfolio != null ? String(portfolio).trim() : '';
    const linkedinStr = linkedin != null ? String(linkedin).trim() : '';

    if (!resumeStr && !portfolioStr && !linkedinStr) {
      return NextResponse.json(
        {
          success: false,
          error: 'Provide at least one of: resume URL, portfolio URL, or LinkedIn profile',
        },
        { status: 400 }
      );
    }

    const messageStr = message != null ? String(message) : '';
    if (messageStr.length > MAX_MESSAGE) {
      return NextResponse.json(
        { success: false, error: `Message must be at most ${MAX_MESSAGE} characters` },
        { status: 400 }
      );
    }

    const application = await Application.create({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone != null ? String(phone).trim() : '',
      position: String(position).trim(),
      resume: resumeStr || portfolioStr || linkedinStr,
      coverLetter,
      portfolio: portfolioStr || undefined,
      linkedin: linkedinStr || undefined,
      github: github != null ? String(github).trim() : undefined,
      message: messageStr || undefined,
      status: 'pending',
    });

    return NextResponse.json(
      { success: true, data: application },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit application',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = requireAdminSession(request);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const applications = await Application.find({})
      .sort({ createdAt: -1 });
    
    return NextResponse.json(
      { success: true, data: applications },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch applications',
      },
      { status: 500 }
    );
  }
}
