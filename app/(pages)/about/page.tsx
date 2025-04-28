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
    <div className="flex flex-col justify-center w-[90%] mx-auto items-center">
      <div className="bg-gray-50 flex flex-col gap-4 p-4 mx-auto items-center dark:bg-gray-900 dark:text-white">
        <h1 className="text-2xl font-bold">About Me</h1>
        <div className="flex flex-col-reverse sm:flex-row   w-full sm:h-[70vh] gap-4 items-center justify-between px-3 sm:px-10">
          <section className="flex flex-col items-center sm:w-1/2">
            <div className="flex flex-col gap-2 mb-5">
              <h1 className="text-2xl font-bold">I'm Mihreteab Bizuayehu</h1>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                I am a passionate and results-driven Full Stack Developer with a
                BSc Degree in Computer Engineering from Bahir Dar University,
                earned on July 19, 2023. My expertise lies in building fast,
                scalable, and modern web applications that deliver seamless user
                experiences. I specialize in the MERN stack and Next.js, with
                strong proficiency in both frontend and backend technologies
                including HTML5, CSS3, Bootstrap5, Tailwind CSS, Shadcn UI,
                DaisyUI, JavaScript/ES6, React, and React Native. On the server
                side, I work confidently with Node.js/Express.js and databases
                such as MongoDB, MySQL, and PostgreSQL, alongside tools like
                Prisma ORM. In addition to my web development stack, I also have
                solid experience in programming languages like C++, Java,
                JavaScript/TypeScript, and Python. I’m committed to crafting
                digital solutions that are not only visually appealing but also
                high-performing and reliable.
              </p>
            </div>
          </section>

          <section className="flex flex-col items-center sm:w-1/2">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="relative overflow-hidden w-32 h-32 rounded-full">
                <Image
                  src={mera}
                  fill
                  alt={'Profile Image'}
                  className="w-full h-full object-cover rounded-full mb-2"
                  priority
                />
              </div>
              <ul>
                {user.map((item, index) => (
                  <li
                    key={index}
                    className="flex flex-col sm:flex-row items-center sm:mb-2 mb-5"
                  >
                    <span className="ml-2 font-medium text-lg flex gap-2">
                      <item.icon color={item.color} size={item.size} />
                      {item.label}
                    </span>
                    <span className="ml-2 font-medium text-lg">
                      {item.content}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>

      <div className="bg-gray-100 px-3 sm:px-10 sm:py-15 py-5  h-auto w-full dark:bg-gray-950 dark:text-white">
        <section className="flex flex-col items-center w-full">
          <h3 className="text-2xl font-bold mb-5">Skills</h3>
          <div className="flex flex-col sm:flex-row gap-4 sm:mt-10 w-full">
            <div className="flex flex-col items-center sm:w-1/2">
              <h2 className="mb-5 sm:mb-10 text-lg font-bold">
                Programming Languages
              </h2>
              <ul className="w-full grid grid-cols-2 sm:grid-cols-3 sm:gap-3">
                {iconsConfig.programmingLanguages.map((item, index) => (
                  <li key={index} className="flex items-center sm:mb-2 mb-5">
                    <span className="ml-2 text-lg flex gap-2">
                      {item.icon}
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center sm:w-1/2">
              <h2 className="mb-5 sm:mb-10 text-lg font-bold">
                Web Technologies
              </h2>
              <ul className="w-full grid grid-cols-2 sm:grid-cols-3 sm:gap-3">
                {iconsConfig.webTechnologies.map((item, index) => (
                  <li key={index} className="flex items-center sm:mb-2 mb-5">
                    <span className="ml-2 text-lg flex gap-2">
                      {item.icon}
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <Suspense fallback={<Loading />}>
        <div className="w-full bg-gray-50 px-3 sm:px-10 sm:py-15 py-5  h-auto dark:bg-gray-900 dark:text-white">
          <section className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-5">Certificates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:mt-10">
              {Array.isArray(certificates) ? (
                certificates.map((certificate) => (
                  <FetchCertificate
                    key={certificate.id}
                    certificate={certificate}
                  />
                ))
              ) : (
                <p className="text-red-500">{certificates.error}</p>
              )}
            </div>
          </section>
        </div>
      </Suspense>
    </div>
  );
}
