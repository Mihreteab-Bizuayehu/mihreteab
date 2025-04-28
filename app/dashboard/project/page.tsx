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
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteProject, getProjects } from '@/app/actions/project';
import toast from 'react-hot-toast';
import { ProjectTypes } from '@/types/DataType';
import Loading from '@/components/loading';

export default function Projects() {
  const [projects, setProjects] = useState<ProjectTypes[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getProjects();
      if ('error' in projects) {
        toast.error(projects.error);
        setProjects([]);
      } else {
        setProjects(projects);
      }
    };
    fetchProjects();
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/dashboard/project/create?id=${id}`);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this project?'
    );
    if (!confirmDelete) return;

    try {
      setProjects((prev) => prev.filter((project) => project.id !== id));
      const deleted = await deleteProject(id.toString());
      if (!deleted) {
        throw new Error('Something went wrong during deletion.');
      }
      toast.success('Project deleted successfully!');
      router.refresh();
    } catch (error: any) {
      toast.error(`Delete failed: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col gap-4 p-4 dark:bg-gray-900 dark:text-white">
      <div className="flex p-4 mx-5 items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link
          href={'/dashboard/project/create'}
          className={buttonVariants({ variant: 'default' })}
        >
          Create Project
        </Link>
      </div>
      <section className="flex flex-col gap-y-10 px-3 sm:p-5 overflow-x-auto">
        <Table>
          <TableCaption>A list of all projects</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-200 dark:bg-gray-800">
              <TableHead className="min-w-[50px]">ID</TableHead>
              <TableHead className="min-w-[80px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="min-w-[300px] max-w-[500px]">
                Description
              </TableHead>
              <TableHead className="min-w-[150px]">Site</TableHead>
              <TableHead className="min-w-[200px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={<Loading />}>
            <TableBody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.id}</TableCell>
                    <TableCell>
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        width={50}
                        height={50}
                        className="object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            '/placeholder-project.png';
                        }}
                      />
                    </TableCell>
                    <TableCell className="truncate max-w-[150px]">
                      {project.title}
                    </TableCell>
                    <TableCell className="max-w-[500px] truncate">
                      {project.description}
                    </TableCell>
                    <TableCell className="truncate max-w-[150px]">
                      <a
                        href={project.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit Site
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Button
                          variant={'secondary'}
                          className="uppercase"
                          onClick={() => handleEdit(project.id)}
                        >
                          Update
                        </Button>
                        <Button
                          variant={'destructive'}
                          className="uppercase"
                          onClick={() => handleDelete(project.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        No projects found
                      </p>
                      <Link
                        href="/dashboard/project/create"
                        className={buttonVariants({
                          variant: 'default',
                          size: 'sm',
                        })}
                      >
                        Create New Project
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
