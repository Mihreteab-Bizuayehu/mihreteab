'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { useState } from 'react';
import { SkillTypes } from '@/types/DataType';

export default function FetchSkill({ skill }: { skill: SkillTypes }) {
  const [clip, setClip] = useState('line-clamp-5 md:line-clamp-6');
  return (
    <Card
      key={skill.id}
      className="group mx-auto w-full max-w-sm md:max-w-md rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 dark:bg-gray-950 dark:border-gray-800"
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center text-gray-800 dark:text-white">
          {skill.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p
          className={`text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300  ${clip}`}
          aria-expanded={clip === ''}
        >
          {skill.description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-center pt-4">
        <Button
          onClick={() =>
            setClip(clip === '' ? 'line-clamp-4 md:line-clamp-6' : '')
          }
          variant="outline"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md 
                 border border-primary text-primary hover:bg-primary hover:text-white 
                 active:scale-95 transition-all duration-200"
          aria-label={`Toggle ${skill.title} description`}
        >
          {clip === '' ? 'Read Less' : 'Read More'}
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
