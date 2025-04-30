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
  const [clip, setClip] = useState('line-clamp-8');
  return (
    <Card
      key={skill.id}
      className="mx-auto py-6 md:py-8 lg:py-10 transition-all duration-300 
            hover:scale-[1.02] active:scale-[0.98] 
            dark:bg-gray-950 dark:text-gray-100"
    >
      <CardHeader>
        <CardTitle
          className="text-base md:text-lg lg:text-xl font-semibold text-center 
                         text-gray-900 dark:text-white"
        >
          {skill.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className={`text-sm md:text-base lg:text-[15px] leading-relaxed 
                text-gray-600 dark:text-gray-300/90 ${clip}`}
        >
          {skill.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          onClick={() =>
            setClip(clip === '' ? 'line-clamp-4 md:line-clamp-6' : '')
          }
          variant="outline"
          className="hover:bg-primary hover:text-white active:scale-95 
                transition-all duration-200"
          aria-label={`Toggle ${skill.title} description`}
        >
          Read {clip === '' ? 'Less' : 'More'}
        </Button>
      </CardFooter>
    </Card>
  );
}
