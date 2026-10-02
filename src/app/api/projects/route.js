import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { uploadToCloudinary } from '@/lib/cloudinary';

const dbPath = path.join(process.cwd(), 'src', 'data', 'projects.json');

function readData() {
  try {
    if (!fs.existsSync(dbPath)) {
      return { projects: [] };
    }
    const content = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return { projects: [] };
  }
}

function writeData(data) {
  try {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.warn('Cannot write to file system in serverless environment:', err.message);
  }
}

export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') || '';
    let slug = formData.get('slug') || '';
    const type = formData.get('type') || 'web'; // 'web' or 'app'
    const category = formData.get('category') || '';
    const client = formData.get('client') || '';
    const description = formData.get('description') || '';
    const technologiesStr = formData.get('technologies') || '';
    const projectLink = formData.get('projectLink') || '';
    const githubLink = formData.get('githubLink') || '';
    const featured = formData.get('featured') === 'true';

    if (!slug) {
      slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const technologies = technologiesStr.split(',').map(t => t.trim()).filter(Boolean);

    const imageFiles = formData.getAll('images');
    const imageUrls = [];

    const folderPath = `modulavers/projects/${type}/${slug}`;

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      if (file && typeof file === 'object' && file.name) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        try {
          // Upload directly to Cloudinary
          const cUrl = await uploadToCloudinary(buffer, folderPath);
          imageUrls.push(cUrl);
        } catch (cErr) {
          console.warn('Cloudinary upload error, falling back to base64:', cErr.message);
          const mimeType = file.type || 'image/jpeg';
          imageUrls.push(`data:${mimeType};base64,${buffer.toString('base64')}`);
        }
      }
    }

    const newProject = {
      id: `proj-${Date.now()}`,
      title,
      slug,
      type,
      category,
      client,
      description,
      technologies,
      projectLink,
      githubLink,
      images: imageUrls,
      featured,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const data = readData();
    data.projects.unshift(newProject);
    writeData(data);

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
