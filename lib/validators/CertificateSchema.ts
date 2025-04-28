import { z } from 'zod';

 export const CertificateSchema = z.object({
   title: z.string().min(3, 'Name is too short'),
   description: z.string().min(10, 'Description is too short'),
   image: z.any().refine((file) => file instanceof File && file.size > 0, 'Image is required').optional(),
 });

export type CertificateFormData = z.infer<typeof CertificateSchema>;
