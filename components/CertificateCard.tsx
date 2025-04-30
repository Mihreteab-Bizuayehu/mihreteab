'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { CertificateTypes } from '@/types/DataType';

export default function FetchCertificate({
  certificate,
}: {
  certificate: CertificateTypes;
}) {
  const [clip, setClip] = useState('line-clamp-2');
  return (
    <Card
      key={certificate.id}
      className="group mx-auto max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-md border hover:shadow-xl transition-transform duration-300 hover:scale-105 dark:bg-gray-950 dark:text-white"
    >
      <div className="relative overflow-hidden sm:h-72 h-48 w-full rounded-t-2xl">
        <Image
          src={certificate.imageUrl}
          alt={certificate.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority
        />
      </div>
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold tracking-wide text-gray-800 dark:text-white">
          {certificate.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <p
          className={`text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 ${clip}`}
        >
          {certificate.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          onClick={() => setClip(clip === '' ? 'line-clamp-2' : '')}
          variant="outline"
          className="group-hover:bg-primary group-hover:text-white transition-colors duration-300"
        >
          Read {clip === '' ? 'Less' : 'More'}
        </Button>
      </CardFooter>
    </Card>
  );
}
