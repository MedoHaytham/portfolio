import React from "react";
import TopSection from "../components/topSection";
import { MdDesignServices } from "react-icons/md";
import { IoIosRocket } from "react-icons/io";
import { FaCode } from "react-icons/fa";
import connectDB from "@/lib/connectDB";
import Service from "@/app/models/Services"

const icons = {
  MdDesignServices,
  IoIosRocket,
  FaCode,
};

async function ServicesPage() {

  await connectDB();
  const servicesData = await Service.find({}).sort({_id: 1}).lean(); 

  return (
    <section className="services" id="services">
      <TopSection title={"Services"} desc={"What I Offer"} />
      <div className="wrapper flex justify-between items-center flex-wrap">
        {
          servicesData.map((s) => {
            const Icon = icons[s.icon];

            return (
              <article
                key={s._id.toString()}
                className="card items-start w-full mb-10 md:w-[48%] lg:w-[31%] lg:mb-0 py-12.5 px-10"
              >
                <Icon className="text-[70px] mb-5 text-primary"/>
                <h3 className="mb-5">{s.title}</h3>
                <p className="text-light text-[14px]">{s.desc}</p>
              </article>
              )
            })
          }
      </div>
    </section>
  );
}

export default ServicesPage;
