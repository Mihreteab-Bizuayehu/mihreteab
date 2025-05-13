'use client';

import { useState } from 'react';
import { createContact } from '@/app/actions/contact';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('subject', form.subject);
    formData.append('message', form.message);

    const res = await createContact(formData);

    if (res.success) {
      setForm({ name: '', email: '', subject: '', message: '' });
      toast.success('✅ Message sent successfully!');
    } else {
      toast.error('❌ Failed to send message. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <Card className="w-full max-w-xl dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Send Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto">
            <Input
              onChange={handleChange}
              type="text"
              name="name"
              value={form.name}
              placeholder="Your Name"
              required
            />
            <Input
              onChange={handleChange}
              type="email"
              name="email"
              value={form.email}
              placeholder="Your Email"
              required
            />
            <Input
              onChange={handleChange}
              type="text"
              name="subject"
              value={form.subject}
              placeholder="Subject"
              required
            />
            <Textarea
              onChange={handleChange}
              name="message"
              value={form.message}
              placeholder="Message ..."
              required
            />

            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-900 transition-colors duration-300 text-base  md:text-lg"
            >
              {loading ? 'Sending...' : 'Send'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
