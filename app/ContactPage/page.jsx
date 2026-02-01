"use client"
import React, { useRef, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import TopSection from "../components/topSection";

const contactData = [
  {
    id: 1,
    icon: <MdOutlineMail className="text-[2rem] mb-2" />,
    title: "Email",
    info: "mohamedhaytham20039@gmail.com",
    link: "mailto:mohamedhaytham20039@gmail.com",
  },
  {
    id: 2,
    icon: <RiMessengerLine className="text-[2rem] mb-2" />,
    title: "Messenger",
    info: "Mohamed Haytham",
    link: "https://m.me/medo.haytham.31",
  },
  {
    id: 3,
    icon: <FaWhatsapp className="text-[2rem] mb-2" />,
    title: "WhatsApp",
    info: "01116339830",
    link: "https://api.whatsapp.com/send?phone=201116339830",
  },
];

function ContactPage() {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_1pswwjp", "template_05h25xq", formRef.current, {
        publicKey: "50JsRbDXjEL9VcWXL",
      })
      .then(
        () => {
          toast.success("Email Sent");
          e.target.reset();
        },
        (error) => {
          toast.error("Failed to send email", error.text);
        }
      );
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  let onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const schema = {
    name: Joi.string().required(),
    email: Joi.string().required(),
    message: Joi.string().required(),
  };

  const [errors, setErrors] = useState({});

  const validate = () => {
    const { error } = Joi.validate(form, schema, { abortEarly: false });

    const errors = {};
    if (error) {
      for (let i = 0; i < error.details.length; i++) {
        errors[error.details[i].path[0]] = error.details[i].message;
      }
    }

    setErrors(errors);
    return Object.keys(errors).length > 0 ? errors : null;
  };

  let submitHadnler = (e) => {
    e.preventDefault();

    const errors = validate();
    if (errors) return;
    sendEmail(e);
  };

  return (
    <section className="contact" id="contact">
      <TopSection title={"Contact Me"} desc={"Get In Touch"} />
      <div className="wrapper w-[90%] md:w-[60%] grid grid-cols-1 lg:grid-cols-[30%_58%] gap-8 lg:gap-[12%]">
        <div className="contact-options flex flex-col gap-[1.2rem]">
          {contactData.map((c) => (
            <article
              className="card p-4 sm:p-6 rounded-[1.2rem] hover:border-primaryVariant"
              key={c.id}
            >
              {c.icon}
              <h4>{c.title}</h4>
              <h5 className="text-[0.9rem] lg:text-[0.55rem] 2xl:text-[0.84rem]">
                {c.info}
              </h5>
              <a
                href={c.link}
                target="_blank"
                className="text-primary mt-[0.7rem] inline-block text-[0.8rem]"
              >
                Send Message
              </a>
            </article>
          ))}
        </div>
        <form
          ref={formRef}
          onSubmit={submitHadnler}
          className="flex flex-col gap-7.5"
        >
          <input
            onChange={onChangeHandler}
            type="text"
            name="name"
            placeholder="Your Full Name"
            className="w-full p-6 border-2 border-solid border-primaryVariant rounded-lg bg-transparent resize-none text-white"
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}
          <input
            onChange={onChangeHandler}
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-6 border-2 border-solid border-primaryVariant rounded-lg bg-transparent resize-none text-white"
          />
          {errors.email && <p className="text-red-600">{errors.email}</p>}
          <textarea
            onChange={onChangeHandler}
            rows={5}
            name="message"
            placeholder="Your Message"
            className="w-full p-6 border-2 border-solid border-primaryVariant rounded-lg bg-transparent resize-none text-white"
          ></textarea>
          {errors.message && <p className="text-red-600">{errors.message}</p>}
          <button className="btn btn-primary text-[18px] py-3.5 px-7.5">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
