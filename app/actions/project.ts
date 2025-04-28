'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { deleteFromCloudinary, uploadToCloudinary } from '@/lib/cloudinary';
import { projectSchema } from '@/lib/validators/ProjectSchema';
import { notFound } from 'next/navigation';

export const createProject = async (data: FormData) => {
  try {
    const title = data.get('title')?.toString() || '';
    const description = data.get('description')?.toString() || '';
    const linkUrl = data.get('linkUrl')?.toString() || '';
    const image = data.get('image') as File | null;
    const parsed = projectSchema.safeParse({
      title,
      description,
      linkUrl,
      image: image?.size ? image : undefined,
    });
    if (!parsed.success) {
      if (image && (!(image instanceof File) || image.size === 0)) {
        throw new Error('Image must be a valid file with content');
      }
      throw new Error(parsed.error.message);
    }
    let imageUrl = '';
    let publicId = '';

    if (image instanceof File && image.size > 0) {
      const { secure_url, public_id } = await uploadToCloudinary(image);
      imageUrl = secure_url;
      publicId = public_id;

      await prisma.project.create({
        data: {
          title,
          description,
          linkUrl,
          imageUrl,
          cloudinaryId: publicId,
        },
      });
    }

    revalidatePath('/dashboard/project');
    revalidatePath('/');
    revalidatePath('/project/:id');
    return getProjects;
  } catch (error) {
    return { error: 'Failed to create project' };
  }
};

export const getProjects = async () => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return projects;
  } catch (error) {
    return { error: 'Failed to get projects' };
  }
};

export const getProject = async (id: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });
    if (!project) {
      return notFound();
    }
    return project;
  } catch (error) {
    return { error: 'Failed to get project' };
  }
};

export const updateProject = async (id: string, data: FormData) => {
  try {
  const title = data.get('title')?.toString() || '';
  const description = data.get('description')?.toString() || '';
  const linkUrl = data.get('linkUrl')?.toString() || '';
  const image = data.get('image') as File | null;
    const parsed = projectSchema.safeParse({
      title,
      description,
      linkUrl,
      image: image?.size ? image : undefined,
    });

    if (!parsed.success) {
    if (image && (!(image instanceof File) || image.size === 0)) {
      throw new Error('Image must be a valid file with content');
    }
    throw new Error(parsed.error.message);
  }

  let imageUrl = '';
  let publicId = '';

    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });

    if (!project) {
      return notFound();
    } else {
      if (project.id && project.cloudinaryId) {
        await deleteFromCloudinary(project.cloudinaryId);

        if (image instanceof File && image.size > 0) {
          const { secure_url, public_id } = await uploadToCloudinary(image);
          imageUrl = secure_url;
          publicId = public_id;
        }
        
        await prisma.project.update({
          where: { id: parseInt(id) },
          data: {
            title,
            description,
            linkUrl,
            imageUrl,
            cloudinaryId: publicId,
          },
        });
      }
    }
    revalidatePath('/dashboard/project');
    revalidatePath('/');
    revalidatePath('/project/:id');
    return getProjects();
  } catch (error) {
    return { error: 'Failed to update project' };
  }
};

export const deleteProject = async (id: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });
    if (!project) {
      return notFound();
    } else {
      if ( project.id && project.cloudinaryId) {
        await deleteFromCloudinary(project.cloudinaryId);
        await prisma.project.delete({ where: { id: parseInt(id) } });
      }
    }
    revalidatePath('/dashboard/project');
    revalidatePath('/');
    revalidatePath('/project/:id');
    return getProjects();
  } catch (error) {
    return { error: 'Failed to delete project' };
  }
};
