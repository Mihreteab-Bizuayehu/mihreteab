import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  subject: z.string().min(5, 'Subject is too short'),
  message: z.string().min(10, 'Message is too short'),
});

export type ContactInput = z.infer<typeof ContactSchema>;