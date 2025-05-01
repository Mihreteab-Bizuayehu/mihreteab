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
      className="group mx-auto w-full max-w-sm md:max-w-md rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 dark:bg-gray-950 dark:border-gray-800"
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
      <CardHeader className="px-5 pt-5 text-center">
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          {certificate.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5">
        <p
          className={`text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300 ${clip}`}
          aria-expanded={clip === ''}
        >
          {certificate.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center px-5 pb-5">
        <Button
          onClick={() => setClip(clip === '' ? 'line-clamp-2' : '')}
          variant="outline"
          className="text-sm font-semibold px-4 py-2 rounded-lg border border-primary hover:bg-primary hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-gray-700"
          aria-label={`Toggle ${certificate.title} description`}
        >
          {clip === '' ? 'Show Less' : 'Read More'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform duration-300 ${
              clip === '' ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
      </CardFooter>
    </Card>
  );
}
