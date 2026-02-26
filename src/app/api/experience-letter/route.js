import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'lib', 'Mohid Hameed Experience Letter.pdf');
    const buffer = await readFile(filePath);
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="Mohid-Hameed-Experience-Letter.pdf"',
      },
    });
  } catch (err) {
    console.error('Experience letter PDF not found:', err.message);
    return new NextResponse('Not found', { status: 404 });
  }
}
