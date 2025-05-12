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
      <div className="w-full flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white py-10 px-4 sm:px-8 lg:px-16 lg:py-10 ">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-center text-gray-700 dark:text-gray-300">
          Know about me
        </h3>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center self-center mb-10 border-b-4 border-blue-500 inline-block">
          About Me
        </h2>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 sm:gap-10">
          <section className="sm:w-1/2 flex flex-col gap-4 text-center sm:text-left">
            <h2 className=" text-2xl sm:text-3xl md:text-4xl font-bold">
              I'm Mihreteab Bizuayehu
            </h2>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              I'm a passionate and results-driven Full Stack Developer with a
              BSc Degree in Computer Engineering from Bahir Dar University (July
              19, 2023). I build fast, scalable, and modern web applications
              with a strong focus on seamless UX. I specialize in the{' '}
              <strong>MERN stack</strong> and <strong>Next.js</strong>, with
              expertise in frontend technologies such as HTML5, CSS3,
              Bootstrap5, Tailwind CSS, Shadcn UI, DaisyUI, and React/React
              Native. On the backend, I work with Node.js, Express.js, MongoDB,
              MySQL, PostgreSQL, and Prisma ORM. I also write in C++, Java,
              TypeScript, and Python. My goal is to craft visually appealing and
              high-performing digital solutions.
            </p>
          </section>

          <section className="sm:w-1/2 flex flex-col items-center gap-6">
            <div className="relative w-36 h-36 rounded-full shadow-lg overflow-hidden">
              <Image
                src={mera}
                alt="Profile Image"
                fill
                className="object-cover"
                priority
              />
            </div>

            <ul className="w-full flex flex-col gap-4">
              {user.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 text-base sm:text-lg md:text-xl font-medium hover:text-blue-500 transition-all"
                >
                  <item.icon color={item.color} size={item.size} />
                  <span>{item.label}</span>
                  <span className=" text-right">{item.content}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-950 px-5 sm:px-12 py-10 sm:py-20 w-full dark:text-white transition-all duration-500">
        <section className="flex flex-col items-center w-full">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-3">
            What I'm good at
          </h3>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-10 border-b-4 border-indigo-500 pb-2">
            Skills
          </h2>
          <div className="flex flex-col sm:flex-row gap-10 w-full max-w-6xl">
            <div className="flex flex-col items-center sm:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition hover:scale-[1.02]">
              <h2 className="text-xl md:text-2xl font-semibold mb-6 text-indigo-600 dark:text-indigo-400">
                Programming Languages
              </h2>
              <ul className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4">
                {iconsConfig.programmingLanguages.map((item, index) => (
                  <li
                    key={index}
                    className=" px-3 py-2 bg-gray-200 rounded-md dark:bg-gray-700 flex items-center justify-start gap-2 text-base sm:text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    <span className="text-xl md:text-2xl">{item.icon}</span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center sm:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition hover:scale-[1.02]">
              <h2 className="text-xl md:text-2xl font-semibold mb-6 text-blue-600 dark:text-blue-400">
                Web Technologies
              </h2>
              <ul className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4">
                {iconsConfig.webTechnologies.map((item, index) => (
                  <li
                    key={index}
                    className=" px-3 py-2 bg-gray-200 rounded-md dark:bg-gray-700 flex items-center justify-start gap-2 text-base sm:text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                  >
                    <span className="text-xl md:text-2xl">{item.icon}</span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <Suspense fallback={<Loading />}>
        <div className="w-full bg-gray-50 px-3 sm:px-10 sm:py-15 py-5  h-auto dark:bg-gray-900 dark:text-white">
          <section className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-12 dark:bg-gray-900 text-gray-900 dark:text-white">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 border-b-4 border-blue-500 pb-2">
              📜 Certificates
            </h3>

            <h4 className="text-gray-500 my-4 dark:text-gray-300 text-base sm:text-lg md:text-xl">
              Here are some of the certificates I've earned over the years.
            </h4>

            {Array.isArray(certificates) && certificates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
                {certificates.map((certificate) => (
                  <div key={certificate.id}>
                    <FetchCertificate certificate={certificate} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-6 dark:text-gray-400 text-base sm:text-lg md:text-xl">
                No certificates available at the moment.
              </p>
            )}
          </section>
        </div>
      </Suspense>
    </div>
  );
}
