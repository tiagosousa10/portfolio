"use client";

import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";

const services = [
  {
    num: "01",
    title: "Development",
    description:
      "Full Stack Developer focused on Java, JavaScript, and TypeScript. I work with Spring Boot and Node.js on the backend, and with Angular, React, and Next.js on the frontend.",
    href: "",
  },
  {
    num: "02",
    title: "UI/UX Design",
    description:
      "Figma is a powerful tool for creating beautiful and functional user interfaces. I use Figma to design web and mobile applications, as well as to create logos and other visual assets.",
    href: "",
  },
  {
    num: "03",
    title: "DevOps",
    description:
      "I have experience with Docker, Kubernetes, and AWS. I can help you deploy your applications and manage your infrastructure.",
    href: "",
  },
  {
    num: "04",
    title: "Blockchain & Smart Contracts",
    description:
      "I develop and deploy Smart Contracts in Solidity for the Ethereum blockchain.",
    href: "",
  },
];

import { motion } from "framer-motion";

const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex flex-col justify-center gap-6 group"
              >
                {/* top */}
                <div className="w-full flex justify-between items-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                    {service.num}
                  </div>
                  <Link
                    href={service.href}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 xl:w-[70px] xl:h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45"
                  >
                    <BsArrowDownRight className="text-primary text-xl sm:text-2xl xl:text-3xl" />
                  </Link>
                </div>
                {/* heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">
                  {service.title}
                </h2>
                {/* description */}
                <p className="text-white/60">{service.description}</p>
                {/* border */}
                <div className="border-b border-white/20 w-full"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
