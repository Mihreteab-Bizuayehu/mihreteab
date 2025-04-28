import { z } from 'zod';

 export const PortfolioSchema = z.object({
   title: z.string().min(3, 'Name is too short'),
   description: z.string().min(10, 'Description is too short'),
   image: z.instanceof(File, { message: 'Image is required' }).optional(),
 });

 export type PortfolioFormData = z.infer<typeof PortfolioSchema>;


