'use client';

import { createPortfolio, getPortfolio, updatePortfolio } from '@/app/actions/portfolio';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  PortfolioFormData,
  PortfolioSchema,
} from '@/lib/validators/PortfolioSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function CreatePortfolio() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const portId= searchParams.get('id');
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'submitting' | 'idle'>('idle');
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(PortfolioSchema),
  });

  useEffect(() => {
    async function fetchPortfolio() {
      if (portId) {
        const portfolio = await getPortfolio(portId);
        if ('title' in portfolio) {
          setValue('title', portfolio.title);
          setValue('description', portfolio.description);
          if (portfolio.imageUrl) {
            setPreview(portfolio.imageUrl);
          }
        } else if ('error' in portfolio) {
          toast.error(portfolio.error);
        }
       }
    }
    fetchPortfolio();
  }, [portId, setValue]);

  const onSubmit = async (data: PortfolioFormData) => {
    setStatus('submitting');
    const formData = new FormData();
    if (portId) {
      formData.append('id', portId.toString());
    }
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.image) {
      formData.append('image', data.image);
    }
    const response = portId
      ? await updatePortfolio(portId.toString(), formData)
      : await createPortfolio(formData);
    setStatus('idle');
    if (response) {
      toast.success(portId ? 'Portfolio updated!' : 'Portfolio created!');
      if (!portId) reset();
    } else {
      toast.error('Error saving portfolio.');
    }
    reset();
    router.push('/dashboard/portfolio');
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
      <Card className="sm:w-2/3 w-[98%] mx-auto sm:mt-5 mt-20 ">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-wide text-gray-800 dark:text-white">
            {portId ? 'Update Portfolio' : 'Create Portfolio'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mx-auto"
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
              <Label className="block mb-1">Upload Portfolio</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border p-2 w-full"
              />
              {preview && (
                <Image
                  src={preview}
                  width={200}
                  height={200}
                  alt="Preview"
                  className="mt-2 w-32 h-auto rounded"
                />
              )}
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={status === 'submitting'}
              className="bg-blue-600 text-white py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-900 transition-colors duration-300"
            >
              {status === 'submitting'
                ? 'Submitting...'
                : portId
                ? 'Update'
                : 'Submit'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
