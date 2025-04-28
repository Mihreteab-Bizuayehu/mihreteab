import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import mera from '@/public/mera.jpg';
import Link from 'next/link';
import { getPortfolios } from './actions/portfolio';
import { getProjects } from './actions/project';
import { getSkills } from './actions/skill';
import FetchSkill from '@/components/SkillCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import FetchProject from '@/components/ProjectCard';
import { Suspense } from 'react';
import Loading from '@/components/loading';

export default async function Home() {
  const skills = await getSkills();
  const portfolios = await getPortfolios();
  const projects = await getProjects();
  return (
    <div className="flex flex-col justify-center w-[90%] mx-auto items-center">
      <div className="bg-gray-50 flex flex-col-reverse sm:flex-row dark:bg-gray-950 dark:text-white  w-full sm:h-[70vh] gap-4 items-center justify-between px-3 sm:px-10">
        <section className="flex flex-col items-center sm:w-1/2">
          <div className="flex flex-col gap-2 mb-5">
            <h1 className="text-2xl font-bold">Hi, I'm Mihreteab Bizuayehu</h1>
            <h3 className="text-lg font-semibold">
              Full Stack Developer | MERN Stack, Next.js & React Native
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              I build fast, scalable, and modern web applications with seamless
              user experiences. From powerful backends to sleek frontends — I
              craft digital solutions that work beautifully and perform
              flawlessly.
            </p>
            <Link
              href="/contact"
              className={`${buttonVariants(
                {}
              )} mt-3 self-center sm:self-start not-first:group-hover:bg-primary uppercase group-hover:text-white transition-colors duration-300`}
            >
              Hire Me
            </Link>
          </div>
        </section>

        <section className="flex flex-col items-center sm:w-1/2">
          <div className="flex items-center justify-center mt-10 w-[200px] h-[250px] relative rounded-md">
            <Image
              src={mera}
              alt="Profile Photo"
              fill
              priority
              className="object-cover rounded-md"
            />
          </div>
        </section>
      </div>

      <Suspense fallback={<Loading />}>
        <div className="w-full bg-gray-100 px-3 sm:px-10 py-15 h-auto dark:bg-gray-900  dark:text-white">
          <section className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-3">Skills</h3>
            <h2 className="text-2xl font-bold border-b-4 border-orange-500">
              Some of My Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {Array.isArray(skills) &&
                skills.map((skill) => (
                  <FetchSkill key={skill.id} skill={skill} />
                ))}
            </div>
          </section>
        </div>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <div className="w-full bg-gray-50 sm:px-10 px-3 py-15 h-auto dark:bg-gray-950 dark:text-white">
          <section className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-3 capitalize">Portfolio</h3>
            <h2 className="text-2xl font-bold border-b-4 border-orange-500 capitalize">
              My Portfolios
            </h2>

            <Carousel
              orientation="horizontal"
              className="mt-20 w-full max-w-3xl rounded-lg"
            >
              <CarouselContent>
                {Array.isArray(portfolios) &&
                  portfolios.map((portfolio) => (
                    <CarouselItem
                      key={portfolio.id}
                      className="relative w-[50vw] lg:min-w-4xl md:min-w-3xl h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg 
            hover:scale-105 transition-transform duration-500 ease-in-out hover:shadow-2xl"
                    >
                      <div className="absolute flex flex-col items-center justify-center w-full h-full transition-opacity duration-500">
                        <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg">
                          <Image
                            src={portfolio.imageUrl}
                            alt={portfolio.title}
                            fill
                            className="object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                            priority
                          />
                        </div>
                      </div>

                      <div
                        className="absolute w-full h-full flex justify-center items-center bg-black bg-opacity-60 backdrop-blur-md 
            transition-opacity duration-500 ease-in-out opacity-0 hover:opacity-100 px-30"
                      >
                        <div className="flex flex-col justify-center items-center text-white text-center px-5 gap-5">
                          <h3 className="text-xl font-semibold transition-transform duration-500 translate-y-5 hover:translate-y-0">
                            {portfolio.title}
                          </h3>
                          <p className="text-sm opacity-80 transition-opacity duration-500 hover:opacity-100">
                            {portfolio.description}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>
        </div>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <div className="w-full bg-gray-100 px-3 sm:px-10 py-15 h-auto dark:bg-gray-900 dark:text-white">
          <section className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-3 capitalize">
              what i do?
            </h3>
            <h2 className="text-2xl font-bold border-b-4 border-orange-500 capitalize">
              my projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {Array.isArray(projects) &&
                projects.map((project: any) => (
                  <FetchProject key={project.id} project={project} />
                ))}
            </div>
          </section>
        </div>
      </Suspense>
    </div>
  );
}
