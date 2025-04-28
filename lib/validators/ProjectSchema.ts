import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(3, 'Title is too short'),
  description: z.string().min(10, 'Description is too short'),
  linkUrl: z.string().url('Invalid URL'),
  image: z.instanceof(File, { message: 'Image is required' }).optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
