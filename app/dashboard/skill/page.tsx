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
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Skills
          </h1>
          <Link
            href="/dashboard/skill/create"
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            Create Skill
          </Link>
        </header>

        <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableCaption className="text-gray-500 dark:text-gray-400 p-4 text-left">
              A list of my recent skills.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-800 hover:bg-transparent">
                <TableHead className="w-[100px] font-semibold text-gray-700 dark:text-gray-300">
                  ID
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Title
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Description
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <Suspense fallback={<Loading />}>
              <TableBody>
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <TableRow
                      key={skill.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
                    >
                      <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                        {skill.id}
                      </TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-200">
                        {skill.title}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300 max-w-[500px] truncate">
                        {truncateWords(skill.description, 5)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(skill.id)}
                            className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 uppercase"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(skill.id)}
                            className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/40 uppercase"
                          >
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="py-10 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <p className="text-gray-500 dark:text-gray-400">
                          No skills found
                        </p>
                        <Link
                          href="/dashboard/skill/create"
                          className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600"
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
    </div>
  );
}
