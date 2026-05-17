import ContactForm from './ContactForm'
import FadeUp from './FadeUp'
import PageContainer from './PageContainer'
import ProfileActions from './ProfileActions'
import ScrambleText from './ScrambleText'
import TiltCard from './TiltCard'

export default function ContactSection() {
  return (
    <section id="contact" className="section-spacing contact-section">
      <PageContainer>
        <FadeUp>
          <TiltCard className="float-card contact-section__card relative">
            <div className="section-rail" aria-hidden>
              <span className="section-label section-label--side">
                <ScrambleText i18nKey="contactForm.rail" />
              </span>
            </div>

            <p className="font-mono text-[10px] tracking-[0.2em] text-near-black/45 uppercase">
              <ScrambleText i18nKey="contactForm.label" />
            </p>
            <h2 className="contact-headline mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,2.75rem)] font-bold uppercase tracking-tight text-near-black">
              <ScrambleText i18nKey="contactForm.title" />
            </h2>
            <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-near-black/60">
              <ScrambleText i18nKey="contactForm.desc" />
            </p>

            <div className="mt-8 border-t border-black/10 pt-8">
              <ContactForm />
            </div>

            <ProfileActions className="mt-8" showCalendar />
          </TiltCard>
        </FadeUp>
      </PageContainer>
    </section>
  )
}
