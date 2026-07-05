import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Position from '@/models/Position';
import { requireAdminSession } from '@/lib/admin-auth';

function parseCategory(input: unknown): 'engineering' | 'security' | 'operations' {
  const s = String(input ?? 'engineering').toLowerCase();
  if (s === 'security' || s === 'operations') return s;
  return 'engineering';
}

function parseTags(input: unknown): string[] | undefined {
  if (input === undefined) return undefined;
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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const position = await Position.findById(id).lean();

    if (!position || !position.isActive) {
      return NextResponse.json(
        { success: false, error: 'Position not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: position },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching position:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch position',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = requireAdminSession(request);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();

    const { id } = await params;

    const position = await Position.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!position) {
      return NextResponse.json(
        { success: false, error: 'Position not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: position },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting position:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete position',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = requireAdminSession(request);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const { title, isActive, summary, icon, tags, description, category } = body;

    const updateData: Record<string, unknown> = {};
    if (title !== undefined) {
      updateData.title = String(title).trim();
    }
    if (isActive !== undefined) {
      updateData.isActive = Boolean(isActive);
    }
    if (summary !== undefined) {
      updateData.summary = String(summary).trim();
    }
    if (icon !== undefined) {
      updateData.icon = String(icon).trim() || 'work';
    }
    if (tags !== undefined) {
      const parsed = parseTags(tags);
      if (parsed !== undefined) {
        updateData.tags = parsed;
      }
    }
    if (description !== undefined) {
      updateData.description = String(description);
    }
    if (category !== undefined) {
      updateData.category = parseCategory(category);
    }

    const position = await Position.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!position) {
      return NextResponse.json(
        { success: false, error: 'Position not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: position },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating position:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update position',
      },
      { status: 500 }
    );
  }
}
