"use client";
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaFigma,
  FaNodeJs,
} from "react-icons/fa";

import { SiTailwindcss, SiNextdotjs } from "react-icons/si";

//about data
const about = {
  title: "About me",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Tiago Sousa",
    },
    {
      fieldName: "Phone",
      fieldValue: "(+351) 917 381 411",
    },
    {
      fieldName: "Exeperience",
      fieldValue: "12+ Years",
    },
    {
      fieldName: "Skype",
      fieldValue: "tiagosousa",
    },
    {
      fieldName: "Nationality",
      fieldValue: "Portuguese",
    },
    {
      fieldName: "Email",
      fieldValue: "tiagosousa.tams@teste.com",
    },
    {
      fieldName: "Freelance",
      fieldValue: "Available",
    },
    {
      fieldName: "Languages",
      fieldValue: "English, Portuguese",
    },
  ],
};

//experience data
const experience = {
  icon: "/assets/resume/badge.svg",
  title: "My Experience",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  items: [
    {
      company: "Tech Solutions Inc.",
      position: "Full Stack Developer",
      duration: "2022 - Present",
    },
    {
      company: "Web Design Studio",
      position: "Full Stack Developer Intern",
      duration: "2022 - Present",
    },
    {
      company: "E-commerce Startup",
      position: "Freelance Web Developer",
      duration: "2022 - 2023",
    },
    {
      company: "Tech Academy",
      position: "Teaching Assistant",
      duration: "2022 - 2023",
    },
    {
      company: "Digital Agency",
      position: "UX/UI Designer",
      duration: "2018 - 2019",
    },
    {
      company: "Software Development Firm",
      position: "Junir Developer",
      duration: "2017 - 2018",
    },
  ],
};

//education data
const education = {
  icon: "/assets/resume/cap.svg",
  title: "My Experience",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  items: [
    {
      institution: "Online Course Platform",
      degree: "Full Stack Web Development Bootcamp",
      duration: "2023",
    },
    {
      institution: "Codeacademy",
      degree: "Front-end Track",
      duration: "2022",
    },
    {
      institution: "Online Course",
      degree: "Programming Course",
      duration: "2020-2021",
    },
    {
      institution: "Tech Institute",
      degree: "Certified Web Developer",
      duration: "2019",
    },
    {
      institution: "Design School",
      degree: "Diploma in Graphic Design",
      duration: "2016-2018",
    },
    {
      institution: "Community College",
      degree: "Associate Degree in Computer Science",
      duration: "2014-2016",
    },
  ],
};

//skils data
const skills = {
  title: "My Skills",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  skillList: [
    {
      icon: <FaHtml5 />,
      name: "HTML5",
    },
    {
      icon: <FaCss3 />,
      name: "CSS3",
    },
    {
      icon: <FaJs />,
      name: "JavaScript",
    },
    {
      icon: <FaReact />,
      name: "React",
    },
    {
      icon: <SiTailwindcss />,
      name: "Tailwind CSS",
    },
    {
      icon: <SiNextdotjs />,
      name: "Next.js",
    },
    {
      icon: <FaFigma />,
      name: "Figma",
    },
    {
      icon: <FaNodeJs />,
      name: "Node.js",
    },
  ],
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px] "
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
          </TabsList>

          {/* content */}
          <div className="min-h-[70vh] w-full">
            <TabsContent value="experience" className="w-full">
              experience
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
