import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import confetti from 'canvas-confetti'
import { WEB3FORMS_ACCESS_KEY, HAS_CONTACT_FORM } from '../lib/site'
import { playSuccess } from '../utils/sound'

const CONFETTI_COLORS = ['#E8522A', '#F0B429', '#F5F0E8', '#1A1410']

function fireConfetti() {
  confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors: CONFETTI_COLORS, gravity: 1.2, scalar: 0.9, drift: 0.5 })
  confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors: CONFETTI_COLORS, gravity: 1.2, scalar: 0.9, drift: -0.5 })
  setTimeout(() => {
    confetti({ particleCount: 40, angle: 90, spread: 70, origin: { x: 0.5, y: 0.6 }, colors: CONFETTI_COLORS, gravity: 1.5, scalar: 0.8 })
  }, 300)
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!HAS_CONTACT_FORM) {
      setStatus('error')
      return
    }

    const form = e.currentTarget
    const data = new FormData(form)

    if (data.get('botcheck')) return

    setStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          subject: `co-studio — ${data.get('name')}`,
          replyto: data.get('email'),
          from_name: 'co-studio',
          logo: 'https://co-studio.at/favicon-32.png',
        }),
      })

      const json = (await res.json()) as { success?: boolean }

      if (!res.ok || !json.success) {
        setStatus('error')
        return
      }

      setStatus('success')
      form.reset()
      playSuccess()
      fireConfetti()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="botcheck"
        className="contact-form__honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      <div className="contact-form__grid">
        <label className="contact-form__field">
          <span className="contact-form__label">{t('contactForm.name')}</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className="contact-form__input"
            disabled={status === 'sending'}
          />
        </label>

        <label className="contact-form__field">
          <span className="contact-form__label">{t('contactForm.email')}</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="contact-form__input"
            disabled={status === 'sending'}
          />
        </label>
      </div>

      <label className="contact-form__field">
        <span className="contact-form__label">{t('contactForm.message')}</span>
        <textarea
          name="message"
          required
          rows={5}
          className="contact-form__input contact-form__textarea"
          disabled={status === 'sending'}
        />
      </label>

      <div className="contact-form__footer">
        <button
          type="submit"
          className="contact-form__submit nav-pill nav-link"
          disabled={status === 'sending' || !HAS_CONTACT_FORM}
          data-cursor-hover
        >
          {status === 'sending' ? t('contactForm.sending') : t('contactForm.submit')} →
        </button>

        {status === 'success' && (
          <p className="contact-form__feedback contact-form__feedback--success" role="status">
            {t('contactForm.success')}
          </p>
        )}
        {status === 'error' && (
          <p className="contact-form__feedback contact-form__feedback--error" role="alert">
            {HAS_CONTACT_FORM ? t('contactForm.error') : t('contactForm.notConfigured')}
          </p>
        )}
      </div>

      <p className="contact-form__hint">{t('contactForm.privacy')}</p>
    </form>
  )
}
