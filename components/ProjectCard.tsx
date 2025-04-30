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
      className="group mx-auto w-full max-w-[95vw] sm:max-w-md md:max-w-lg rounded-2xl shadow-md border hover:shadow-xl transition-all duration-300 hover:scale-[1.02] dark:bg-gray-900 dark:border-gray-800"
    >
      <Link href={`/project/${project.id}`} className="block">
        <div className="relative overflow-hidden w-full aspect-video rounded-t-2xl">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <CardHeader className="text-center px-4 pt-4">
          <CardTitle className="text-lg md:text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            {project.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="px-4 pb-2">
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 line-clamp-3 leading-snug md:leading-relaxed">
            {project.description}
          </p>
        </CardContent>

        <CardFooter className="flex justify-center pb-4 px-4">
          <Button
            variant="outline"
            className="min-h-10 px-6 py-2 text-sm md:text-base group-hover:bg-primary group-hover:text-white transition-colors duration-300"
            aria-label={`View ${project.title} project`}
          >
            See More
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
