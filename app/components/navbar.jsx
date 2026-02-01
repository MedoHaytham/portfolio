"use client"
import React, { useEffect, useRef, useState } from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { PiBook } from "react-icons/pi";
import { GrProjects } from "react-icons/gr";
import { BiMessageSquareDetail } from "react-icons/bi";

const navItems = [
  { 
    id: 1,
    href: '#', 
    icon: <IoHomeOutline /> 
  },
  {
    id: 2,
    href: '#about',
    icon: <LuUserRound />
  },
  { 
    id: 3,
    href: '#services',
    icon: <PiBook />
  },
  { 
    id: 4,
    href: '#projects',
    icon: <GrProjects />
  },
  { 
    id: 5,
    href: '#contact',
    icon: <BiMessageSquareDetail />
  },
];

function Navbar() {
  const [active, setActive] = useState('#');
  const activeRef = useRef(active);
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const handleScroll = () => {
      const scrollY = window.scrollY;

      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      if (scrollY + windowHeight >= documentHeight - 5) {
        setShow(false);
      } else {
        setShow(true);
      }

      if (scrollY < 100) {
        if (activeRef.current !== '#') setActive('#');
      } else {
        sections.forEach((sec) => {
          const top = sec.offsetTop - 150;
          const height = sec.offsetHeight;
          const current = `#${sec.id}`;
          if (scrollY >= top && scrollY < top + height) {
            if (activeRef.current !== current) setActive(current);
          }
        });
      }
      
      lastScrollY.current = scrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`bg-black/30 w-max flex gap-[0.8rem] py-[0.7rem] px-[1.7rem] z-10 fixed left-1/2 -translate-x-1/2 bottom-8 rounded-[3rem] backdrop-blur-lg transition-main-all ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {
        navItems.map((n) => (
          <a
            key={n.id}
            href={n.href} 
            onClick={() => setActive(n.href)} 
            className={`p-[0.8rem] rounded-full text-light text-[1.1rem] lg:hover:bg-black/30 ${active === n.href ? 'bg-primary': 'bg-transparent'}`}>
              {n.icon}
          </a>
        ))
      }
    </nav>
  )
}

export default Navbar