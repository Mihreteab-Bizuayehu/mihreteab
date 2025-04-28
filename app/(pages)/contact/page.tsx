import ContactForm from "@/components/ContactForm";
import { user } from "@/constants/constant";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Contact-MeraBizu",
}
export default function Contact() {
    return (
      <div className=" bg-gray-50 flex flex-col justify-center items-center pt-10 dark:bg-gray-900 dark:text-white ">
        <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
        <h2 className="text-2xl font-bold border-b-4 border-orange-500">
          Contact Me
        </h2>
        <div className=" flex flex-col-reverse sm:flex-row   w-full  gap-4 sm:px-10 py-5 sm:pb-20 h-min-screen sm:pt-25  justify-center items-center">
          <section className="flex flex-col items-center sm:w-1/2 w-ful px-4 w-full">
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-2xl font-bold ml-4 mb-4 text-center sm:self-start">
                Contact
              </h1>
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
          <section className="flex flex-col items-center sm:w-1/2 w-ful px-4 w-full">
            <ContactForm />
          </section>
        </div>
      </div>
    );
}