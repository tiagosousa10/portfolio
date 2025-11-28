"use client";

import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsArrowUpRight, BsGithub, BsLinkedin } from "react-icons/bs";

import WorkSliderButtons from "@/components/WorkSliderButtons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const WorkClient = ({ projects = [] }) => {
  console.log(`[DEBUG] WorkClient: Received projects:`, projects);
  console.log(`[DEBUG] WorkClient: Projects count: ${projects.length}`);
  console.log(`[DEBUG] WorkClient: Projects type:`, typeof projects);
  console.log(
    `[DEBUG] WorkClient: Projects is array:`,
    Array.isArray(projects)
  );

  const safeProjects = useMemo(() => {
    const filtered = projects.filter(Boolean);
    console.log(`[DEBUG] WorkClient: Safe projects after filter:`, filtered);
    console.log(`[DEBUG] WorkClient: Safe projects count: ${filtered.length}`);
    return filtered;
  }, [projects]);

  const [selectedProject, setSelectedProject] = useState(safeProjects[0]);

  useEffect(() => {
    console.log(`[DEBUG] WorkClient useEffect: Projects changed`, {
      projects,
      safeProjects,
      selectedProject,
      projectsLength: projects.length,
      safeProjectsLength: safeProjects.length,
    });

    // Atualizar selectedProject quando os projetos chegarem
    if (safeProjects.length > 0 && !selectedProject) {
      setSelectedProject(safeProjects[0]);
    }
  }, [projects, safeProjects, selectedProject]);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setSelectedProject(safeProjects[currentIndex] ?? safeProjects[0]);
  };

  if (!safeProjects.length) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center">
        <p className="text-white/70">
          Nenhum projeto selecionado. Atualize a lista em
          `lib/featuredProjects.js`.
        </p>
      </section>
    );
  }

  const activeProject = selectedProject ?? safeProjects[0];
  const liveHref = activeProject.live || activeProject.github || "#";
  const githubHref = activeProject.github || liveHref || "#";
  const stackItems = activeProject.stack ?? [];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[60px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {activeProject.num}
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[42px] font-bold leading-none text-white transition-all duration-500">
                  {activeProject.title}
                </h1>
                <h2 className="text-[32px] font-semibold leading-none text-white/70 group-hover:text-accent transition-all duration-500 capitalize">
                  {activeProject.category} project
                </h2>
              </div>
              <p className="text-white/60">{activeProject.description}</p>

              {stackItems.length > 0 ? (
                <ul className="flex flex-wrap gap-4">
                  {stackItems.map((tech, index) => (
                    <li
                      key={`${tech.name}-${index}`}
                      className="text-xl text-accent"
                    >
                      {tech.name}
                      {index !== stackItems.length - 1 && ","}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white/40">Stack em breve.</p>
              )}

              <div className="border border-white/20" />

              <div className="flex items-center gap-4">
                <Link href={githubHref} target="_blank" rel="noreferrer">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>GitHub repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                <Link href={liveHref} target="_blank" rel="noreferrer">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsLinkedin className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>LinkedIn Video</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {safeProjects.map((item, index) => (
                <SwiperSlide key={item.github ?? index} className="w-full">
                  <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20 overflow-hidden rounded-lg">
                    <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10" />
                    <Image
                      src={item.image}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-fill"
                      alt={item.title}
                      quality={100}
                      priority={index === 0}
                      style={{
                        imageRendering: "high-quality",
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}

              <WorkSliderButtons
                containerStyles="flex  gap-2 absolute right-0 bottom-0 [calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default WorkClient;
