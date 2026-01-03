import React, { useRef } from 'react';
import './contactPage.css'
import TopSection from '../../components/topSection'
import Card from '../../components/card'
import { MdOutlineMail } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const contactData = [
  {
    id: 1,
    icon: <MdOutlineMail className='text-[2rem] mb-2'/>,
    title: 'Email',
    info: 'mohamedhaytham20039@gmail.com',
    link: 'mailto:mohamedhaytham20039@gmail.com',
  },
  {
    id: 2,
    icon: <RiMessengerLine className='text-[2rem] mb-2'/>,
    title: 'Messenger',
    info: 'Mohamed Haytham',
    link: 'https://m.me/medo.haytham.31',
  },
  {
    id: 3,
    icon: <MdOutlineMail className='text-[2rem] mb-2'/>,
    title: 'WhatsApp',
    info: '01116339830',
    link: 'https://api.whatsapp.com/send?phone=201116339830'
  }
]


function ContactPage() {

  const form = useRef();

  const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm('service_1pswwjp', 'template_05h25xq', form.current, {
      publicKey: '50JsRbDXjEL9VcWXL',
    })
    .then(
      () => {
        toast.success('Email Sent');
      },
      (error) => {
        toast.error('Failed to send email', error.text);
      },
    );
  }
  
  return (
    <section className='contact' id='contact'>
      <TopSection title={'Contact Me'} desc={'Get In Touch'}/>
      <div className="container w-[90%] md:w-[60%] grid grid-cols-1 lg:grid-cols-[30%,58%] gap-[2rem] lg:gap-[12%]">
        <div className="contact-options flex flex-col gap-[1.2rem]">
          {
            contactData.map((c) => (
              <div className="card p-4 sm:p-6 rounded-[1.2rem] hover:border-primaryVariant" key={c.id}>
                {c.icon}
                <h4>{c.title}</h4>
                <h5 className='lg:text-[0.55rem] 2xl:text-[0.84rem]'>{c.info}</h5>
                <a href={c.link} target='_blank' className='text-primary mt-[0.7rem] inline-block text-[0.8rem]'>Send Message</a>
              </div>
            ))
          }
        </div>
        <form ref={form} onSubmit={sendEmail} className='flex flex-col gap-[30px]'>
          <input type="text" name='name' placeholder='Your Full Name' className='w-full p-6 border-2 border-solid border-primaryVariant rounded-lg bg-transparent resize-none text-white'/>
          <input type="email" name='email' placeholder='Your Email' className='w-full p-6 border-2 border-solid border-primaryVariant rounded-lg bg-transparent resize-none text-white'/>
          <textarea rows={5} name="message" placeholder='Your Message' className='w-full p-6 border-2 border-solid border-primaryVariant rounded-lg bg-transparent resize-none text-white'></textarea>
          <button className='btn btn-primary text-[18px] py-[14px] px-[30px]'>Send Message</button>
        </form>
      </div>
    </section>
  )
}

export default ContactPage