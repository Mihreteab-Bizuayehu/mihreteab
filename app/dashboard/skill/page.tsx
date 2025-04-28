'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { truncateWords } from '@/constants/constant';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteSkill, getSkills } from '@/app/actions/skill';
import toast from 'react-hot-toast';
import { SkillTypes } from '@/types/DataType';
import Loading from '@/components/loading';

export default function Skills() {
  const [skills, setSkills] = useState<SkillTypes[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchSkills() {
      const data = await getSkills();
      if ('error' in data) {
        setSkills([]);
      } else {
        setSkills(data);
      }
    }
    fetchSkills();
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/dashboard/skill/create?id=${id}`);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this skill?'
    );
    if (!confirmDelete) return;

    try {
      setSkills((prev) => prev.filter((skill) => skill.id !== id));
      const deleted = await deleteSkill(id.toString());
      if (!deleted) {
        throw new Error('Something went wrong during deletion.');
      }
      toast.success('Skill deleted successfully!');
      router.refresh();
    } catch (error: any) {
      toast.error(`Delete failed: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div className=" bg-gray-50 flex flex-col gap-4 p-4 dark:bg-gray-950 dark:text-white">
      <div className="flex p-4 mx-5 items-center justify-between">
        <h1 className="text-2xl font-bold">Skills</h1>
        <Link
          href={'/dashboard/skill/create'}
          className={buttonVariants({ variant: 'default' })}
        >
          Create
        </Link>
      </div>
      <section className="flex flex-col gap-y-10 px-3 sm:p-5 ">
        <Table>
          <TableCaption>A list of my recent skillls.</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-200 dark:bg-gray-800 dark:text-white ">
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={<Loading />}>
            <TableBody>
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <TableRow key={skill.id}>
                    <TableCell className="font-medium">{skill.id}</TableCell>
                    <TableCell>{skill.title}</TableCell>
                    <TableCell className="w-[500px]">
                      {truncateWords(skill.description, 5)}
                    </TableCell>
                    <TableCell className="w-[500px]">
                      <div className="flex items-center gap-4">
                        <Button
                          variant={'secondary'}
                          className="uppercase"
                          onClick={() => handleEdit(skill.id)}
                        >
                          Update
                        </Button>
                        <Button
                          variant={'destructive'}
                          className="uppercase"
                          onClick={() => handleDelete(skill.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        No skills found
                      </p>
                      <Link
                        href="/dashboard/skill/create"
                        className={buttonVariants({
                          variant: 'default',
                          size: 'sm',
                        })}
                      >
                        Create New Skill
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Suspense>
        </Table>
      </section>
    </div>
  );
}
