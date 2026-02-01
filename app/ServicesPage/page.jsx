import React from "react";
import TopSection from "../components/topSection";
import { MdDesignServices } from "react-icons/md";
import { IoIosRocket } from "react-icons/io";
import { FaCode } from "react-icons/fa";

const servicesData = [
  {
    id: 1,
    icon: <MdDesignServices className="text-[70px] mb-5 text-primary" />,
    title: "Web Developer",
    desc: "We craft modern and responsive user interfaces that focus accessibility, and a seamless user experience across all devices.",
  },
  {
    id: 2,
    icon: <IoIosRocket className="text-[70px] mb-5 text-primary" />,
    title: "Fast Performance",
    desc: "Specialized in front-end development with a strong focus on performance usability, speed, and pixel-perfect implementation.",
  },
  {
    id: 3,
    icon: <FaCode className="text-[70px] mb-5 text-primary" />,
    title: "Clean Code",
    desc: "We build modern front-end interfaces with clean, well-structured code that is easy to read, maintain, and scale.",
  },
];

function ServicesPage() {
  return (
    <section className="services" id="services">
      <TopSection title={"Services"} desc={"What I Offer"} />
      <div className="wrapper flex justify-between items-center flex-wrap">
        {servicesData.map((s) => (
          <article
            key={s.id}
            className="card items-start w-full mb-10 md:w-[48%] lg:w-[31%] lg:mb-0 py-12.5 px-10"
          >
            {s.icon}
            <h3 className="mb-5">{s.title}</h3>
            <p className="text-light text-[14px]">{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ServicesPage;
