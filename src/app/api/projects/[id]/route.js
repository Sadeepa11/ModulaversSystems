import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const data = readData();
    const index = data.projects.findIndex(p => p.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    const projectToDelete = data.projects[index];

    // Remove image folder if exists
    if (projectToDelete.type && projectToDelete.slug) {
      const folderPath = path.join(process.cwd(), 'public', 'images', 'projects', projectToDelete.type, projectToDelete.slug);
      if (fs.existsSync(folderPath)) {
        fs.rmSync(folderPath, { recursive: true, force: true });
      }
    }

    data.projects.splice(index, 1);
    writeData(data);

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = readData();
    const index = data.projects.findIndex(p => p.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    const existingProject = data.projects[index];
    const formData = await request.formData();

    const title = formData.get('title') || existingProject.title;
    const type = formData.get('type') || existingProject.type;
    const category = formData.get('category') || existingProject.category;
    const client = formData.get('client') || existingProject.client;
    const description = formData.get('description') || existingProject.description;
    const technologiesStr = formData.get('technologies') || '';
    const featured = formData.get('featured') === 'true';

    const technologies = technologiesStr
      ? technologiesStr.split(',').map(t => t.trim()).filter(Boolean)
      : existingProject.technologies;

    let imageUrls = [...(existingProject.images || [])];
    const newImageFiles = formData.getAll('images');

    // Handle new uploads if provided
    if (newImageFiles && newImageFiles.length > 0 && newImageFiles[0]?.name) {
      const targetDir = path.join(process.cwd(), 'public', 'images', 'projects', type, existingProject.slug);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const uploadedUrls = [];
      for (let i = 0; i < newImageFiles.length; i++) {
        const file = newImageFiles[i];
        if (file && typeof file === 'object' && file.name) {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);

          const ext = path.extname(file.name) || '.jpg';
          const baseName = path.basename(file.name, ext).toLowerCase().replace(/[^a-z0-9]+/g, '-');
          const filename = `${Date.now()}-${i + 1}-${baseName}${ext}`;

          const filePath = path.join(targetDir, filename);
          fs.writeFileSync(filePath, buffer);

          uploadedUrls.push(`/images/projects/${type}/${existingProject.slug}/${filename}`);
        }
      }

      if (uploadedUrls.length > 0) {
        imageUrls = uploadedUrls;
      }
    }

    const updatedProject = {
      ...existingProject,
      title,
      type,
      category,
      client,
      description,
      technologies,
      images: imageUrls,
      featured
    };

    data.projects[index] = updatedProject;
    writeData(data);

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
