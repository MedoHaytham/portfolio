import HomePage from './pages/home/homePage';
import Navbar from './components/navbar/navbar';
import AboutPage from './pages/about/aboutPage';
import SkillsPage from './pages/skills/skillsPage';
import ProjectsPage from './pages/projects/projectsPage';
import ContactPage from './pages/contact/contactPage';
import Footer from './components/footer/footer';
import ServicesPage from './pages/services/servicesPage';

function App() {

  return (
    <> 
      <HomePage />
      <Navbar />
      <AboutPage />
      <SkillsPage />
      {/* <ServicesPage /> */}
      <ProjectsPage />
      <ContactPage />
      <Footer />
    </>
  )
}

export default App
