import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Position from '@/models/Position';
import { getAdminSessionFromRequest, requireAdminSession } from '@/lib/admin-auth';

function parseCategory(input: unknown): 'engineering' | 'security' | 'operations' {
  const s = String(input ?? 'engineering').toLowerCase();
  if (s === 'security' || s === 'operations') return s;
  return 'engineering';
}

function parseTags(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input.map((t) => String(t).trim()).filter(Boolean).slice(0, 8);
  }
  if (typeof input === 'string') {
    return input
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 8);
  }
  return [];
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const session = getAdminSessionFromRequest(request);
    const query = session ? {} : { isActive: true };

    const positions = session
      ? await Position.find(query).sort({ createdAt: -1 })
      : await Position.find(query).sort({ title: 1 });

    return NextResponse.json(
      { success: true, data: positions },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching positions:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch positions',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = requireAdminSession(request);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();

    const body = await request.json();
    const { title, summary, icon, tags, description, category } = body;

    if (!title || !String(title).trim()) {
      return NextResponse.json(
        { success: false, error: 'Position title is required' },
        { status: 400 }
      );
    }

    const titleTrim = String(title).trim();
    const tagList = parseTags(tags);

    const existingPosition = await Position.findOne({
      title: { $regex: new RegExp(`^${titleTrim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
    });

    if (existingPosition) {
      if (!existingPosition.isActive) {
        existingPosition.isActive = true;
        existingPosition.summary = summary !== undefined ? String(summary).trim() : existingPosition.summary;
        existingPosition.icon = icon !== undefined ? String(icon).trim() || 'work' : existingPosition.icon;
        existingPosition.tags = tagList.length ? tagList : existingPosition.tags;
        existingPosition.description =
          description !== undefined ? String(description) : existingPosition.description;
        if (category !== undefined) {
          existingPosition.category = parseCategory(category);
        }
        await existingPosition.save();
        return NextResponse.json(
          { success: true, data: existingPosition },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { success: false, error: 'Position already exists' },
        { status: 400 }
      );
    }

    const position = await Position.create({
      title: titleTrim,
      isActive: true,
      summary: summary !== undefined ? String(summary).trim() : '',
      icon: icon !== undefined ? String(icon).trim() || 'work' : 'work',
      tags: tagList,
      description: description !== undefined ? String(description) : '',
      category: parseCategory(category),
    });

    return NextResponse.json(
      { success: true, data: position },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating position:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create position',
      },
      { status: 500 }
    );
  }
}
