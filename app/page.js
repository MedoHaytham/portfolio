import { ToastContainer } from "react-toastify";
import AboutPage from "./AboutPage/page";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import ContactPage from "./ContactPage/page";
import HomePage from "./HomePage/page";
import ProjectsPage from "./ProjectsPage/page";
import ServicesPage from "./ServicesPage/page";
import SkillsPage from "./SkillsPage/page";

export default function Home() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
      <HomePage />
      <Navbar />
      <AboutPage />
      <SkillsPage />
      <ServicesPage />
      <ProjectsPage />
      <ContactPage />
      <Footer />
    </>
  );
}
