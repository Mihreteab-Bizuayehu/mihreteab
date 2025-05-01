'use client';
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
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Projects
          </h1>
          <Link
            href="/dashboard/project/create"
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            Create Project
          </Link>
        </header>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableCaption className="text-gray-500 dark:text-gray-400 p-4 text-left">
                A list of all projects
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-gray-700 hover:bg-transparent">
                  <TableHead className="min-w-[50px] font-semibold text-gray-700 dark:text-gray-300">
                    ID
                  </TableHead>
                  <TableHead className="min-w-[80px] font-semibold text-gray-700 dark:text-gray-300">
                    Image
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                    Title
                  </TableHead>
                  <TableHead className="min-w-[300px] max-w-[500px] font-semibold text-gray-700 dark:text-gray-300">
                    Description
                  </TableHead>
                  <TableHead className="min-w-[150px] font-semibold text-gray-700 dark:text-gray-300">
                    Site
                  </TableHead>
                  <TableHead className="min-w-[200px] font-semibold text-gray-700 dark:text-gray-300">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <Suspense fallback={<Loading />}>
                <TableBody>
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <TableRow
                        key={project.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-600"
                      >
                        <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                          {project.id}
                        </TableCell>
                        <TableCell>
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            width={50}
                            height={50}
                            className="object-cover rounded-md"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                '/placeholder-project.png';
                            }}
                          />
                        </TableCell>
                        <TableCell className="text-gray-800 dark:text-gray-200 truncate max-w-[150px]">
                          {project.title}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-300 max-w-[500px] truncate">
                          {project.description}
                        </TableCell>
                        <TableCell className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 truncate max-w-[150px]">
                          <a
                            href={project.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            Visit Site
                          </a>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 flex-wrap">
                            <button
                              onClick={() => handleEdit(project.id)}
                              className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 uppercase"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleDelete(project.id)}
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
                      <TableCell colSpan={6} className="text-center py-10">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <p className="text-gray-500 dark:text-gray-400">
                            No projects found
                          </p>
                          <Link
                            href="/dashboard/project/create"
                            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600"
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
          </div>
        </section>
      </div>
    </div>
  );
}
