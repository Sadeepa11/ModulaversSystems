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

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    if (process.env.MONGODB_URI) {
      try {
        await dbConnect();
        const deletedProject = await Project.findByIdAndDelete(id);
        if (deletedProject) {
          return NextResponse.json({ success: true, message: 'Project deleted successfully' });
        }
      } catch (err) {
        console.warn('MongoDB delete fallback to JSON:', err.message);
      }
    }

    // JSON Fallback
    const data = readJsonData();
    const index = data.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      data.projects.splice(index, 1);
      writeJsonData(data);
    }

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const formData = await request.formData();

    let existingProject = null;
    let isMongo = false;

    if (process.env.MONGODB_URI) {
      try {
        await dbConnect();
        existingProject = await Project.findById(id);
        if (existingProject) isMongo = true;
      } catch (err) {
        console.warn('MongoDB fetch fallback to JSON:', err.message);
      }
    }

    if (!existingProject) {
      const data = readJsonData();
      existingProject = data.projects.find(p => p.id === id);
    }

    if (!existingProject) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    const title = formData.get('title') || existingProject.title;
    const type = formData.get('type') || existingProject.type;
    const category = formData.get('category') || existingProject.category;
    const client = formData.get('client') || existingProject.client;
    const description = formData.get('description') || existingProject.description;
    const technologiesStr = formData.get('technologies') || '';
    const projectLink = formData.get('projectLink') !== null ? formData.get('projectLink') : (existingProject.projectLink || '');
    const githubLink = formData.get('githubLink') !== null ? formData.get('githubLink') : (existingProject.githubLink || '');
    const featured = formData.get('featured') === 'true';

    const technologies = technologiesStr
      ? technologiesStr.split(',').map(t => t.trim()).filter(Boolean)
      : existingProject.technologies;

    const rawImages = formData.getAll('images');
    let imageUrls = [...(existingProject.images || [])];

    if (rawImages && rawImages.length > 0) {
      const folderPath = `modulavers/projects/${type}/${existingProject.slug || 'project'}`;
      const uploadedUrls = [];

      for (let i = 0; i < rawImages.length; i++) {
        const item = rawImages[i];
        if (typeof item === 'string' && item.trim()) {
          uploadedUrls.push(item);
        } else if (item && typeof item === 'object' && item.name) {
          const bytes = await item.arrayBuffer();
          const buffer = Buffer.from(bytes);

          try {
            const cUrl = await uploadToCloudinary(buffer, folderPath);
            uploadedUrls.push(cUrl);
          } catch (cErr) {
            const mimeType = item.type || 'image/jpeg';
            uploadedUrls.push(`data:${mimeType};base64,${buffer.toString('base64')}`);
          }
        }
      }

      if (uploadedUrls.length > 0) {
        imageUrls = uploadedUrls;
      }
    }

    const updateFields = {
      title,
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

    if (isMongo) {
      const updatedProject = await Project.findByIdAndUpdate(id, updateFields, { new: true });
      return NextResponse.json({ success: true, project: updatedProject });
    }

    // JSON Fallback
    const data = readJsonData();
    const index = data.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      data.projects[index] = { ...data.projects[index], ...updateFields };
      writeJsonData(data);
      return NextResponse.json({ success: true, project: data.projects[index] });
    }

    return NextResponse.json({ success: false, error: 'Project update failed' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
