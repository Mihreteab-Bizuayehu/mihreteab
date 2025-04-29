'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectFormData, projectSchema } from '@/lib/validators/ProjectSchema';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { createProject, getProject, updateProject } from '@/app/actions/project';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProjectForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });
  const [preview, setPreview] = useState<string | null>(null);
  const searchParams=useSearchParams();
  const [status, setStatus] = useState<'submitting' | 'idle'>('idle');
  const router = useRouter();
  const projectId = searchParams.get('id');

  useEffect (() => {
    async function fetchProject() {
     try {
       if (projectId) {
         const project = await getProject(projectId);
         if ('title' in project) {
           setValue('title', project.title);
           setValue('description', project.description);
           setValue('linkUrl', project.linkUrl);
           if (project.imageUrl) {
             setPreview(project.imageUrl);
           }
         }
         else if ('error' in project) {
           toast.error(project.error);
         }
       }
     } catch (error) {
       console.error('Error fetching project:', error);
     }
    }
   fetchProject();
  }, [projectId, setValue]);

  const onSubmit = async (data: ProjectFormData) => {
    setStatus('submitting');

    const formData = new FormData();
    if (projectId) {
      formData.append('id', projectId);
     }
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('linkUrl', data.linkUrl);
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = projectId
      ? await updateProject(projectId.toString(), formData)
      : await createProject(formData);

    if (response) {
      toast.success(projectId? 'Project updated!' : 'Project created!');
      setStatus('idle');
      if (!projectId) reset();
      router.push('/dashboard/project');
    } else {
      toast.error('Error saving project.');
      setStatus('idle');
    }
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
              {projectId ? 'Edit Project' : 'Create Project'}
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
                <Label>Project Link</Label>
                <Input {...register('linkUrl')} className="border p-2 w-full" />
                {errors.linkUrl && (
                  <p className="text-red-500">{errors.linkUrl.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="block mb-1">Upload Project</Label>
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
                  : projectId
                  ? 'Update'
                  : 'Submit'}
              </Button>
            </form>
          </CardContent>
        </Card>
    </div>
  );
}
