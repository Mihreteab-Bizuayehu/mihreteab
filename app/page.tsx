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
      <div className="bg-gray-50 dark:bg-gray-950 dark:text-white w-full py-12 sm:h-[70vh] flex flex-col-reverse sm:flex-row items-center justify-between gap-8 px-4 sm:px-10 max-w-screen-xl mx-auto">
        <section className="w-full sm:w-1/2 flex flex-col gap-4 text-center sm:text-left">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight text-balance">
            Hi, I'm Mihreteab Bizuayehu
          </h1>
          <h3 className="text-lg sm:text-2xl font-medium tracking-tight text-pretty">
            Full Stack Developer | MERN Stack, Next.js & React Native
          </h3>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 text-justify">
            I build fast, scalable, and modern web applications with seamless
            user experiences. From powerful backends to sleek frontends — I
            craft digital solutions that work beautifully and perform
            flawlessly.
          </p>
          <Link
            href="/contact"
            className={`${buttonVariants()} mt-4 sm:mt-6 inline-block w-max uppercase transition-all duration-300 hover:bg-primary hover:text-white self-center sm:self-start`}
          >
            Hire Me
          </Link>
        </section>
        <section className="w-full sm:w-1/2 flex items-center justify-center">
          <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-md overflow-hidden shadow-lg mt-8 sm:mt-0">
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
        <div className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white px-4 sm:px-8 md:px-12 py-16">
          <section className="flex flex-col items-center text-center max-w-6xl mx-auto">
            <h3 className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Skills
            </h3>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white border-b-4 border-blue-500 pb-2">
              Some of My Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full">
              {Array.isArray(skills) &&
                skills.map((skill) => (
                  <div key={skill.id}>
                    <FetchSkill skill={skill} />
                  </div>
                ))}
            </div>
          </section>
        </div>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <div className="w-full bg-gray-50 dark:bg-gray-950 dark:text-white px-4 sm:px-8 md:px-12 py-12 md:py-20">
          <section className="flex flex-col items-center mx-auto max-w-7xl text-center">
            <h3 className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300 mb-1 uppercase tracking-wide">
              Portfolio
            </h3>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold border-b-4 border-blue-500 pb-1 mb-8 capitalize">
              My Portfolios
            </h2>
            <Carousel className="w-full max-w-5xl mt-10 sm:mt-14 md:mt-20">
              <CarouselContent>
                {Array.isArray(portfolios) &&
                  portfolios.map((portfolio) => (
                    <CarouselItem
                      key={portfolio.id}
                      className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg group"
                    >
                      <div className="absolute inset-0">
                        <Image
                          src={portfolio.imageUrl}
                          alt={portfolio.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw"
                          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                          priority
                        />
                      </div>

                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6 sm:px-10 md:px-14">
                        <div className="text-white space-y-4">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                            {portfolio.title}
                          </h3>
                          <p className="text-sm sm:text-base md:text-lg opacity-90 max-w-2xl mx-auto">
                            {portfolio.description}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </section>
        </div>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <div className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white px-4 sm:px-10 py-16">
          <section className="max-w-7xl mx-auto text-center space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                What I Do?
              </h3>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold border-b-4 border-blue-500 inline-block pb-1 capitalize">
                My Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
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
