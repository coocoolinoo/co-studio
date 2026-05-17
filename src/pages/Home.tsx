import About from '../components/About'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import PageRoute from '../components/PageRoute'
import PageTransition from '../components/PageTransition'
import ContactSection from '../components/ContactSection'
import Services from '../components/Services'
import Work from '../components/Work'

export default function Home() {
  return (
    <PageTransition>
      <PageRoute>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Work />
          <Services />
          <ContactSection />
        </main>
        <Footer />
      </PageRoute>
    </PageTransition>
  )
}
