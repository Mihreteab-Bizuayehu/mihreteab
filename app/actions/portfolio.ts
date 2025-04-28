'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { PortfolioSchema } from '@/lib/validators/PortfolioSchema';
import { deleteFromCloudinary, uploadToCloudinary } from '@/lib/cloudinary';
import { notFound } from 'next/navigation';

export const createPortfolio = async (data: FormData) => {
  try {
    const title = data.get('title')?.toString() || '';
    const description = data.get('description')?.toString() || '';
    const image = data.get('image') as File | null;
    const parsed = PortfolioSchema.safeParse({
      title,
      description,
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

    if(image instanceof File && image.size > 0){
      const { secure_url, public_id } = await uploadToCloudinary(image);
      imageUrl = secure_url;
      publicId = public_id;

      await prisma.portfolio.create({
        data: {
          title,
          description,
          imageUrl,
          cloudinaryId: publicId,
        },
      });
    }

    revalidatePath('/dashboard/portfolio');
    revalidatePath('/');
    return getPortfolios();
  } catch (error) {
    return { error: 'Failed to create portfolio' };
  }
}

export const getPortfolios = async () => {
  try {
    const portfolios = await prisma.portfolio.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return portfolios;
  } catch (error) {
    return { error: 'Failed to get portfolios' };
  }
}

export const getPortfolio = async (id: string) => {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: parseInt(id) },
    });
    if(!portfolio){
      return notFound();
    }
    return portfolio;
  } catch (error) {
    return { error: 'Failed to get project' };
  } 
}

export const updatePortfolio = async (id: string, data: FormData) => {
  try {
    const title = data.get('title')?.toString() || '';
    const description = data.get('description')?.toString() || '';
    const image= data.get('image') as File | null;
    const parsed = PortfolioSchema.safeParse({
      title,
      description,
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

    const portfolio = await prisma.portfolio.findUnique({
      where: { id: parseInt(id) },
    });

    if (!portfolio) {
      return notFound();
    } else {
      if (portfolio.id && portfolio.cloudinaryId) {
        await deleteFromCloudinary(portfolio.cloudinaryId);
      
        if (image instanceof File && image.size > 0) {
          const { secure_url, public_id } = await uploadToCloudinary(image);
          imageUrl = secure_url;
          publicId = public_id;
        }
        await prisma.portfolio.update({
          where: { id: parseInt(id) },
          data: {
            title,
            description,
            imageUrl,
            cloudinaryId: publicId,
          },
        });
      }
    }

     revalidatePath('/dashboard/portfolio');
     revalidatePath('/');
     return getPortfolios();
  } catch (error) {
    return { error: 'Failed to update portfolio' };
  }
}

export const deletePortfolio = async (id: string) => {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: parseInt(id) },
    });
    if (!portfolio) {
      return notFound();
    } else {
      if ( portfolio.id && portfolio.cloudinaryId) {
        await deleteFromCloudinary(portfolio.cloudinaryId);
        await prisma.portfolio.delete({ where: { id: parseInt(id) } });
      }
    }
    revalidatePath('/dashboard/portfolio');
    revalidatePath('/');
    return getPortfolios();
  } catch (error) {
    return { error: 'Failed to delete portfolio' };
  }
}