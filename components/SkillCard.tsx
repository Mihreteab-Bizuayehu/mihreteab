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
      className="mx-auto py-10 hover:transform  hover:scale-105 hover:duration-300 dark:bg-gray-950 dark:text-white"
    >
      <CardHeader>
        <CardTitle className="text-lg text-center font-bold">
          {skill.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className={`text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 ${clip}`}
        >
          {skill.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => setClip(clip === '' ? 'line-clamp-8' : '')}
          variant="outline"
          className="group-hover:bg-primary group-hover:text-white transition-colors duration-300"
        >
          Read {clip === '' ? 'Less' : 'More'}
        </Button>
      </CardFooter>
    </Card>
  );
}
