import { z } from 'zod';

 export const SkillSchema = z.object({
  title: z.string().min(3, 'Title is too short'),
  description: z.string().min(10, 'Description is too short'),
 });

 export type SkillFormData = z.infer<typeof SkillSchema>;