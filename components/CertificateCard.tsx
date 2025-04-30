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
      className="group mx-auto w-full max-w-[360px] md:max-w-[400px] rounded-2xl shadow-md border hover:shadow-xl transition-all duration-300 hover:scale-[1.02] dark:bg-gray-900 dark:border-gray-800"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
        <Image
          src={certificate.imageUrl}
          alt={certificate.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
      </div>

      <CardHeader className="px-4 pt-4 text-center">
        <CardTitle className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
          {certificate.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4">
        <p
          className={`text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-300/90 ${clip}`}
          aria-expanded={clip === ''}
        >
          {certificate.description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-center p-4">
        <Button
          onClick={() => setClip(clip === '' ? 'line-clamp-2' : '')}
          variant="outline"
          className="text-sm font-medium transition-colors hover:bg-primary hover:text-white focus-visible:ring-2 focus-visible:ring-primary dark:border-gray-700"
          aria-label={`Toggle ${certificate.title} description`}
        >
          {clip === '' ? 'Show Less' : 'Read More'}
        </Button>
      </CardFooter>
    </Card>
  );
}
