'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { deleteFromCloudinary, uploadToCloudinary } from '@/lib/cloudinary';
import { notFound } from 'next/navigation';
import { CertificateSchema } from '@/lib/validators/CertificateSchema';

export const createCertificate=async(formData: FormData)=> {
  try {
    const title = formData.get('title')?.toString() || '';
    const description = formData.get('description')?.toString() || '';
    const image = formData.get('image') as File | null;

    const parsed = CertificateSchema.safeParse({
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

    if (image && image.size > 0) {
      const { secure_url, public_id } = await uploadToCloudinary(image);
      imageUrl = secure_url;
      publicId = public_id;
    }

    await prisma.certificate.create({
      data: {
        title,
        description,
        imageUrl,
        cloudinaryId: publicId,
      },
    });

    revalidatePath('/dashboard/certificate');
    revalidatePath('/about');
    return getCertificates();
  } catch (error: any) {
    console.error('Create certificate error:', error);
    return { error: 'Failed to create certificate' };
  }
}

export const getCertificates=async()=> {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return certificates;
  } catch (error: any) {
    console.error('Get certificates error:', error);
    return { error: 'Failed to get certificates' };
  }
}

export const getCertificate=async(id: string)=> {
  try {
    const certificate = await prisma.certificate.findUnique({
      where: { id: parseInt(id) },
    });
    if (!certificate) {
      return notFound();
    }
    return certificate;
  } catch (error: any) {
    console.error('Get certificate error:', error);
    return { error: 'Failed to get certificate' };
  }
}

export const updateCertificate=async(id: string, formData: FormData)=> {
  try {
    const image = formData.get('image') as File | null;
    const title = formData.get('title')?.toString() || '';
    const description = formData.get('description')?.toString() || '';

    const parsed = CertificateSchema.safeParse({
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

    const certificate = await prisma.certificate.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!certificate) {
      return notFound();
    } else {
      if ( certificate.id && certificate.cloudinaryId) {
        await deleteFromCloudinary(certificate.cloudinaryId);

        if (image instanceof File && image.size > 0) {
          const { secure_url, public_id } = await uploadToCloudinary(image);
          imageUrl = secure_url;
          publicId = public_id;
        }

        await prisma.certificate.update({
          where: { id: parseInt(id) },
          data: { title, description, imageUrl, cloudinaryId: publicId },
        });

      }
      
    }
    revalidatePath('/dashboard/certificate');
    revalidatePath('/about');
    return getCertificates();
  } catch (error: any) {
    console.error("Update certificate error:", error);
    return { error: 'Failed to update certificate' };
  }
}

export const deleteCertificate=async(id: string)=> {
  try {
    const certificate = await prisma.certificate.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!certificate) {
      return notFound();
    } else {
      if (certificate?.id && certificate.cloudinaryId) {
        await deleteFromCloudinary(certificate.cloudinaryId);
        await prisma.certificate.delete({
          where: {
            id: parseInt(id),
          },
        });
      }
    }

    revalidatePath('/dashboard/certificate');
    revalidatePath('/about');
    return getCertificates();
  } catch (error: any) {
    console.error('Delete certificate error:', error);
    return { error: 'Failed to delete certificate' };
  }
}
