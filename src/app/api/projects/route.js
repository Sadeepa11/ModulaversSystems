import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { uploadToCloudinary } from '@/lib/cloudinary';

const dbPath = path.join(process.cwd(), 'src', 'data', 'projects.json');

function readJsonData() {
  try {
    if (!fs.existsSync(dbPath)) return { projects: [] };
    const content = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return { projects: [] };
  }
}

function writeJsonData(data) {
  try {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.warn('File system write skipped:', err.message);
  }
}

export async function GET() {
  try {
    if (process.env.MONGODB_URI) {
      await dbConnect();
      const projects = await Project.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ projects });
    }
  } catch (err) {
    console.error('MongoDB GET Error:', err.message);
    return NextResponse.json({ success: false, error: 'MongoDB connection failed: ' + err.message }, { status: 500 });
  }

  // Fallback to JSON file if MONGODB_URI is not set
  const data = readJsonData();
  return NextResponse.json(data);
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') || '';
    let slug = formData.get('slug') || '';
    const type = formData.get('type') || 'web';
    const category = formData.get('category') || '';
    const client = formData.get('client') || '';
    const description = formData.get('description') || '';
    const technologiesStr = formData.get('technologies') || '';
    const projectLink = formData.get('projectLink') || '';
    const githubLink = formData.get('githubLink') || '';
    const featured = formData.get('featured') === 'true';

    if (!title) {
      return NextResponse.json({ success: false, error: 'Project title is required' }, { status: 400 });
    }

    if (!slug) {
      slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const technologies = technologiesStr.split(',').map(t => t.trim()).filter(Boolean);

    // Process images (either pre-uploaded Cloudinary URL strings or file objects)
    const rawImages = formData.getAll('images');
    const imageUrls = [];
    const folderPath = `modulavers/projects/${type}/${slug}`;

    for (let i = 0; i < rawImages.length; i++) {
      const item = rawImages[i];
      if (typeof item === 'string' && item.trim()) {
        imageUrls.push(item);
      } else if (item && typeof item === 'object' && item.name) {
        const bytes = await item.arrayBuffer();
        const buffer = Buffer.from(bytes);

        try {
          const cUrl = await uploadToCloudinary(buffer, folderPath);
          imageUrls.push(cUrl);
        } catch (cErr) {
          console.warn('Cloudinary upload fallback to Base64:', cErr.message);
          const mimeType = item.type || 'image/jpeg';
          imageUrls.push(`data:${mimeType};base64,${buffer.toString('base64')}`);
        }
      }
    }

    const projectData = {
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
    };

    // Save to MongoDB if MONGODB_URI is configured
    if (process.env.MONGODB_URI) {
      try {
        await dbConnect();
        const newProject = await Project.create(projectData);
        return NextResponse.json({ success: true, project: newProject }, { status: 201 });
      } catch (dbErr) {
        console.error('MongoDB Save Error:', dbErr);
        return NextResponse.json({ success: false, error: 'MongoDB Save Failed: ' + dbErr.message }, { status: 500 });
      }
    }

    // JSON Fallback (Local Development Only)
    const newProject = {
      id: `proj-${Date.now()}`,
      ...projectData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const data = readJsonData();
    data.projects.unshift(newProject);
    writeJsonData(data);

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
