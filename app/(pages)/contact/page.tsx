import ContactForm from "@/components/ContactForm";
import { user } from "@/constants/constant";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Contact-MeraBizu",
}
export default function Contact() {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 dark:text-white flex flex-col items-center pt-16 px-4 sm:px-20">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-center text-gray-700 dark:text-gray-200">
          Get in Touch
        </h3>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold border-b-4 border-blue-500 mb-8 text-center">
          Contact Me
        </h2>

        <div className="flex flex-col-reverse sm:flex-row w-full gap-10 sm:gap-16 py-10 sm:py-20 max-w-7xl">
          <section className="flex flex-col w-full sm:w-1/2 px-2 sm:px-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center sm:text-left">
              Contact
            </h1>
            <ul className="w-full flex flex-col gap-3">
              {user.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-base sm:text-lg md:text-xl font-medium hover:text-blue-500 transition-all duration-300"
                >
                  <span className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-medium text-gray-700 dark:text-gray-200">
                    <item.icon color={item.color} size={item.size} />
                    {item.label}
                  </span>
                  <span className="text-base sm:text-lg md:text-xl text-center sm:text-left font-medium text-gray-700 dark:text-gray-200">
                    {item.content}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <section className="w-full sm:w-1/2 px-2 sm:px-4">
            <ContactForm />
          </section>
        </div>
      </div>
    );
}