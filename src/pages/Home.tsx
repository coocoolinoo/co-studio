import About from '../components/About'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import PageRoute from '../components/PageRoute'
import PageTransition from '../components/PageTransition'
import SEO from '../components/SEO'
import ContactSection from '../components/ContactSection'
import Services from '../components/Services'
import WorkSection from '../components/WorkSection'

export default function Home() {
  return (
    <PageTransition>
      <PageRoute>
        <SEO
          titleKey="seo.homeTitle"
          descriptionKey="seo.homeDescription"
          url="https://www.co-studio.at/"
        />
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <WorkSection />
          <Services />
          <ContactSection />
        </main>
        <Footer />
      </PageRoute>
    </PageTransition>
  )
}
