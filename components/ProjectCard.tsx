'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectTypes } from '@/types/DataType';

export default function FetchProject({ project }: { project: ProjectTypes }) {
  return (
    <Card
      key={project.id}
      className="group w-full max-w-[95vw] sm:max-w-md md:max-w-lg mx-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm hover:shadow-xl transition-transform duration-300 hover:scale-[1.02]"
    >
      <Link
        href={`/project/${project.id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl overflow-hidden"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <CardHeader className="px-5 pt-4 text-center">
          <CardTitle className="text-xl md:text-2xl  font-semibold tracking-tight text-gray-900 dark:text-white">
            {project.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-3">
          <p className="text-base md:text-xl text-gray-700 dark:text-gray-200 line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center px-5 pb-5">
          <Button
            variant="outline"
            className="min-h-10 px-6 py-2 text-base md:text-lg border border-gray-300 dark:border-gray-600 rounded-md group-hover:bg-primary group-hover:text-white transition duration-300"
            aria-label={`View ${project.title} project`}
          >
            See More
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
