import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || 'modulavers/projects';

    if (!file || typeof file !== 'object' || !file.name) {
      return NextResponse.json({ success: false, error: 'No image file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    try {
      const url = await uploadToCloudinary(buffer, folder);
      return NextResponse.json({ success: true, url });
    } catch (cErr) {
      console.warn('Cloudinary upload error, using base64 fallback:', cErr.message);
      const mimeType = file.type || 'image/jpeg';
      const base64Url = `data:${mimeType};base64,${buffer.toString('base64')}`;
      return NextResponse.json({ success: true, url: base64Url });
    }
  } catch (error) {
    console.error('Upload API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
