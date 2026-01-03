import HomePage from './pages/home/homePage';
import Navbar from './components/navbar/navbar';
import AboutPage from './pages/about/aboutPage';
import SkillsPage from './pages/skills/skillsPage';
import ProjectsPage from './pages/projects/projectsPage';
import ContactPage from './pages/contact/contactPage';
import Footer from './components/footer/footer';
import ServicesPage from './pages/services/servicesPage';
import { ToastContainer } from "react-toastify";


function App() {

  return (
    <> 
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
      />
      <HomePage />
      <Navbar />
      <AboutPage />
      <SkillsPage />
      <ServicesPage />
      <ProjectsPage />
      <ContactPage />
      <Footer />
    </>
  )
}

export default App
