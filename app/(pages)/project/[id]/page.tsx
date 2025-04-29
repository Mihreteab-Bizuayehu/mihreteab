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
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col items-center justify-center h-screen text-center dark:text-white dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
        <Link href="/" className="text-blue-600 hover:underline">
          Go back home
        </Link>
      </div>
    </Suspense>
  );
}

  return (
    <Suspense fallback={<Loading />}>
      <div className="bg-gray-50 px-3 sm:px-10 py-15 h-auto dark:bg-gray-900 dark:text-white">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <ArrowLeftIcon size={20} className="sm:ml-30 sm:mt-[-50px]" />
        </Link>

        <section className="flex flex-col items-center">
          <h3 className="text-3xl font-semibold mb-3">{project.title}</h3>

          <div className="flex flex-col items-center gap-4 mt-10">
            <div className="relative overflow-hidden w-full max-w-[600px] h-[300px] rounded-lg">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>

            <div className="flex flex-col gap-2 w-full max-w-[600px]">
              <p className="text-gray-600 dark:text-gray-300">
                {project.description}
              </p>
              <Link
                href={project.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                View Project <ArrowRightIcon size={20} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
}
