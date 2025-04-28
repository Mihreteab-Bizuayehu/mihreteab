'use client';

import { createSkill, getSkill, updateSkill } from '@/app/actions/skill';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SkillFormData, SkillSchema } from '@/lib/validators/SkillSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function CreateSkill() {
  const formStatus = useFormStatus();
  const searchParams = useSearchParams();
  const skillId = searchParams.get('id');
  const [status, setStatus] = useState<'submitting' | 'idle'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SkillFormData>({ resolver: zodResolver(SkillSchema) });
  const router = useRouter();

  useEffect(() => {
    async function fetchSkill() {
      try {
        if (skillId) {
          const skill = await getSkill(skillId);
          
           if ( 'title' in skill) {
            setValue('title', skill.title);
            setValue('description', skill.description);
          }
          else if ('error' in skill) {
            toast.error(skill.error);
          }
          
        }
      } catch (error) {
        console.error('Error fetching skill:', error);
        toast.error('Error fetching skill.');
      }
    }
   fetchSkill();
  }, [skillId, setValue]);

  const onSubmit = async (data: SkillFormData) => {
    setStatus('submitting');

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);

    let response;

    try {
      if (skillId) {
        formData.append('id', skillId.toString());
        response = await updateSkill(skillId.toString(), formData);
      } else {
        response = await createSkill(formData);
      }

      if (response) {
        toast.success(skillId ? 'Skill updated!' : 'Skill created!');
        if (!skillId) reset(); 
        router.push('/dashboard/skill');
      } else {
        toast.error('Error saving skill.');
      }
    } catch (err) {
      console.error('Submit Error:', err);
      toast.error('Something went wrong.');
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="sm:w-2/3 w-[98%] mx-auto sm:mt-5 mt-20 ">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-wide text-gray-800 dark:text-white">
            {skillId ? 'Update Skill' : 'Create Skill'}
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

            <Button
              type="submit"
              disabled={status === 'submitting'}
              className="bg-blue-600 text-white py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-900 transition-colors duration-300"
            >
              {formStatus.pending || status === 'submitting'
                ? 'Submitting...'
                : skillId
                ? 'Update'
                : 'Submit'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
