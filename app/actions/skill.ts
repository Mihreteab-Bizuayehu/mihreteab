'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { SkillSchema } from '@/lib/validators/SkillSchema';
import { notFound } from 'next/navigation';

export const createSkill = async (data: FormData) => { 
  try {
    const title = data.get('title')?.toString() || '';
    const description = data.get('description')?.toString() || '';
    const parsed = SkillSchema.safeParse({ title, description });

    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }
 await prisma.skill.create({
      data: {
        title,
        description,
      },
    });
    revalidatePath('/dashboard/skill');
    return getSkills();
  } catch (error: any) {
    console.error('Error creating skill:', error);
    return { error: 'Failed to create skill' };
  }
}

export const getSkills = async () => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return skills;
  } catch (error: any) {
    console.error('Get skills error:', error);
    return { error: 'Failed to get skills' };
  }
}

export const getSkill = async (id: string) => {
  try {
    const skill = await prisma.skill.findUnique({
      where: { id: parseInt(id) },
    });
    if (!skill) {
      return notFound();
    }
    return skill;
  } catch (error: any) {
    console.error('Get skill error:', error);
    return { error: 'Failed to get skill' };
  }
}

export const updateSkill = async (id: string, data: FormData) => {
  try {
  const title = data.get('title')?.toString() || '';
  const description = data.get('description')?.toString() || '';
  const parsed = SkillSchema.safeParse({ title, description });

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

    const skill = await prisma.skill.findUnique({
      where: { id: parseInt(id) },
    });

    if (!skill) {
      return notFound();
    } else {
      if (skill.id) {
        await prisma.skill.update({
          where: { id: parseInt(id) },
          data: {
            title,
            description,
          },
        });
      }
    }
    revalidatePath('/dashboard/skill');
    return getSkills();
  } catch (error: any) {
    console.error('Error updating skill:', error);
    return { error: 'Failed to update skill' };
  }
}

export const deleteSkill = async (id: string) => {
  try {
    const skill = await prisma.skill.findUnique({
      where: { id: parseInt(id) },
    });
    if (!skill) {
      return notFound();
    } else {
      if (skill.id) {
        await prisma.skill.delete({ where: { id: parseInt(id) } });
      }
    }
    revalidatePath('/dashboard/skill');
    return getSkills();
  } catch (error: any) {
    console.error('Error deleting skill:', error);
    return { error: 'Failed to delete skill' };
  }
}