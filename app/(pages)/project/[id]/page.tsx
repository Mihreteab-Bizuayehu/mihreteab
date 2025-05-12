import { getProject } from "@/app/actions/project";
import Loading from "@/components/loading";
import { ProjectTypes } from "@/types/DataType";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

type ProjectResult =ProjectTypes | { error: string } | null;

export default async function Project({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project: ProjectResult = await getProject(id);

if (!project || 'error' in project) {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white dark:bg-gray-900 dark:text-white">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight md:text-4xl mb-4">
          Project Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md text-base sm:text-lg md:text-xl ">
          The project you’re looking for doesn’t exist or has been removed.
        </p>
        <Link
          href="/"
          className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 text-base sm:text-lg md:text-xl"
        >
          Go Back Home
        </Link>
      </div>
  );
}

  return (
    <Suspense fallback={<Loading />}>
      <div className="bg-gray-50 dark:bg-gray-900 dark:text-white px-4 sm:px-10 py-16 min-h-screen">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-2 mb-6"
        >
          <ArrowLeftIcon size={24} />
          <span className="text-base sm:text-lg md:text-xl">Back</span>
        </Link>

        <section className="flex flex-col items-center text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            {project.title}
          </h3>

          <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
            <div className="relative w-full h-[300px] sm:h-[350px] rounded-xl overflow-hidden shadow-md">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover rounded-xl"
                priority
              />
            </div>

            <div className="w-full text-left space-y-4">
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">
                {project.description}
              </p>

              <Link
                href={project.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 font-medium text-base sm:text-lg md:text-xl"
              >
                View Project <ArrowRightIcon size={24} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
}
