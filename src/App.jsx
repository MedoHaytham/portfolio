import { ToastContainer } from "react-toastify";
import HomePage from "./pages/homePage";
import Navbar from './components/navbar';
import AboutPage from './pages/aboutPage';
import SkillsPage from './pages/skillsPage';
import ServicesPage from './pages/servicesPage';
import ProjectsPage from "./pages/projectsPage";
import ContactPage from "./pages/contactPage";
import Footer from './components/footer';

function App() {
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

export default App;
