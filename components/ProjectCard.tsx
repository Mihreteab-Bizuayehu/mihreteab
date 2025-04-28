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
      className="group mx-auto max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-md border hover:shadow-xl transition-transform duration-300 hover:scale-105 dark:bg-gray-950 dark:text-white"
    >
      <Link href={`/project/${project.id}`}>
        <div className="relative overflow-hidden h-52 w-full rounded-t-2xl">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority
          />
        </div>
        <CardHeader className="text-center pt-4">
          <CardTitle className="text-xl font-semibold tracking-wide text-gray-800 dark:text-white">
            {project.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-2">
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed dark:text-gray-300">
            {project.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pb-4">
          <Button
            variant="outline"
            className="group-hover:bg-primary group-hover:text-white transition-colors duration-300"
          >
            See More
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
