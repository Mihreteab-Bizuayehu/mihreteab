import { Metadata } from 'next';
import mera from '@/public/mera.jpg';
import Image from 'next/image';
import { iconsConfig, user } from '@/constants/constant';
import { getCertificates } from '@/app/actions/certificate';
import FetchCertificate from '@/components/CertificateCard';
import { Suspense } from 'react';
import Loading from '@/components/loading';

export const metadata: Metadata = {
  title: 'About-MeraBizu',
};

export default async function About() {
  const certificates = await getCertificates();

  return (
    <div className="flex flex-col justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-50 dark:bg-gray-900 dark:text-white py-8 sm:py-12 rounded-lg">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <section className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              About Me
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100">
              I'm Mihreteab Bizuayehu
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <p className="text-base sm:text-lg leading-relaxed">
                I am a passionate and results-driven Full Stack Developer with a
                BSc Degree in Computer Engineering from Bahir Dar University,
                earned on July 19, 2023. My expertise lies in building fast,
                scalable, and modern web applications that deliver seamless user
                experiences.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                I specialize in the MERN stack and Next.js, with strong
                proficiency in both frontend and backend technologies including
                HTML5, CSS3, Bootstrap5, Tailwind CSS, Shadcn UI, DaisyUI,
                JavaScript/ES6, React, and React Native. On the server side, I
                work confidently with Node.js/Express.js and databases such as
                MongoDB, MySQL, and PostgreSQL, alongside tools like Prisma ORM.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                In addition to my web development stack, I also have solid
                experience in programming languages like C++, Java,
                JavaScript/TypeScript, and Python. I'm committed to crafting
                digital solutions that are not only visually appealing but also
                high-performing and reliable.
              </p>
            </div>
          </section>

          <section className="w-full lg:w-1/2 flex justify-center">
            <div className="flex flex-col items-center space-y-6 max-w-md">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                <Image
                  src={mera}
                  alt="Profile Image"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <ul className="space-y-3 w-full">
                {user.map((item, index) => (
                  <li
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-2"
                  >
                    <span className="flex items-center text-gray-700 dark:text-gray-300">
                      <item.icon
                        color={item.color}
                        size={20}
                        className="mr-2"
                      />
                      <span className="font-medium">{item.label}</span>
                    </span>
                    <span className="sm:ml-auto text-gray-900 dark:text-white font-semibold">
                      {item.content}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-950 dark:text-white py-8 sm:py-12 rounded-lg mt-8">
        <section className="space-y-8">
          <h3 className="text-3xl font-bold text-center">Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center">
                Programming Languages
              </h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {iconsConfig.programmingLanguages.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
                  >
                    <span className="flex items-center text-gray-800 dark:text-gray-200">
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center">
                Web Technologies
              </h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {iconsConfig.webTechnologies.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
                  >
                    <span className="flex items-center text-gray-800 dark:text-gray-200">
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <Suspense fallback={<Loading />}>
        <div className="bg-gray-50 dark:bg-gray-900 dark:text-white py-8 sm:py-12 rounded-lg mt-8">
          <section className="space-y-8">
            <h3 className="text-3xl font-bold text-center">Certificates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.isArray(certificates) ? (
                certificates.map((certificate) => (
                  <FetchCertificate
                    key={certificate.id}
                    certificate={certificate}
                  />
                ))
              ) : (
                <p className="text-red-500 text-center">{certificates.error}</p>
              )}
            </div>
          </section>
        </div>
      </Suspense>
    </div>
  );
}
