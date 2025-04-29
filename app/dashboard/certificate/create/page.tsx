'use client';

import {
  createCertificate,
  getCertificate,
  updateCertificate,
} from '@/app/actions/certificate';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  CertificateFormData,
  CertificateSchema,
} from '@/lib/validators/CertificateSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function CreateCertificate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const certId= searchParams.get('id');
    const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'submitting' | 'idle'>('idle');
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CertificateFormData>({
    resolver: zodResolver(CertificateSchema),
  });

  useEffect(() => {
    async function fetchCertificate() {
      try {
        if (certId) {
          const certificate = await getCertificate(certId);
         
          if ('title' in certificate) {
            setValue('title', certificate.title);
            setValue('description', certificate.description);
            if (certificate.imageUrl) {
              setPreview(certificate.imageUrl);
            }
          }
          else if ('error' in certificate) {
            toast.error(certificate.error);
          }
        }
      } catch (error) {
        console.error('Error fetching certificate:', error);
        toast.error('Error fetching certificate.');
      }
    }
    fetchCertificate();
  }, [certId, setValue]);

  const onSubmit = async (data: CertificateFormData) => {
    setStatus('submitting');
    const formData = new FormData();
    if (certId) {
      formData.append('id', certId.toString());
    }
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await (certId
      ? updateCertificate(certId.toString(), formData)
      : createCertificate(formData));
    setStatus('idle');
    if (response) {
      toast.success(certId ? 'Project updated!' : 'Project created!');
      if (!certId) reset();
    } else {
      toast.error('Error saving project.');
    }
    reset();
    router.push('/dashboard/certificate');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Suspense fallback={<Loading />}>
        <Card className="sm:w-2/3 w-[98%] mx-auto sm:mt-5 mt-20 ">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tracking-wide text-gray-800 dark:text-white">
              {certId ? 'Edit Certificate' : 'Create Certificate'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 mx-auto dark:text-white"
            >
              <div className="flex flex-col gap-2">
                <Label>Title</Label>
                <Input {...register('title')} className="border p-2 w-full" />
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Textarea
                  {...register('description')}
                  className="border p-2 w-full"
                />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="block mb-1">Upload Certificate</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border p-2 w-full"
                />
                {preview && (
                  <Image
                    src={preview}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="mt-2 w-32 h-auto rounded"
                  />
                )}
              </div>

              <Button
                type="submit"
                disabled={status === 'submitting'}
                className="bg-blue-600 text-white py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-900 transition-colors duration-300"
              >
                {status === 'submitting'
                  ? 'Submitting...'
                  : certId
                  ? 'Update'
                  : 'Submit'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Suspense>
    </div>
  );
}
