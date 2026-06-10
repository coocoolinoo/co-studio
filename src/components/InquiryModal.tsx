import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import emailjs from 'emailjs-com'

interface Package {
  num: string
  name: string
  price: string
  highlight: boolean
}

interface InquiryModalProps {
  pkg: Package | null
  onClose: () => void
}

export default function InquiryModal({ pkg, onClose }: InquiryModalProps) {
  const { t } = useTranslation()
  const [step, setStep] = useState<'form' | 'sending' | 'success' | 'error'>('form')
  const [form, setForm] = useState({ name: '', email: '', phone: '', desc: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = t('pricing.modal.nameError')
    if (!form.email.trim() || !form.email.includes('@')) e.email = t('pricing.modal.emailError')
    if (!form.desc.trim() || form.desc.length < 10) e.desc = t('pricing.modal.descError')
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setStep('sending')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          package_name:  pkg?.name  ?? 'Individuell',
          package_price: pkg?.price ?? '–',
          client_name:   form.name,
          client_email:  form.email,
          client_phone:  form.phone || '–',
          project_desc:  form.desc,
          sent_at: new Date().toLocaleString('de-AT', { timeZone: 'Europe/Vienna' }),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setStep('success')
      const confetti = (await import('canvas-confetti')).default
      confetti({ particleCount: 80, angle: 60,  spread: 55, origin: { x: 0, y: 0.7 }, colors: ['#E8522A', '#F0B429', '#F5F0E8'] })
      confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors: ['#E8522A', '#F0B429', '#F5F0E8'] })
    } catch {
      setStep('error')
    }
  }

  const inputBase: React.CSSProperties = {
    width: '100%',
    background: 'rgba(26,20,16,.03)',
    borderRadius: 10,
    padding: '14px 16px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    color: '#1A1410',
    outline: 'none',
    transition: 'border-color .2s',
    boxSizing: 'border-box',
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    ...inputBase,
    border: `1.5px solid ${errors[field] ? '#ef4444' : 'rgba(26,20,16,.12)'}`,
  })

  if (!pkg) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={e => { if (e.target === e.currentTarget) onClose() }}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(26,20,16,.75)',
          backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(12px, 4vw, 24px)',
        }}
      >
        <motion.div
          initial={{ scale: 0.92, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.92, y: 40, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          style={{
            background: 'white',
            borderRadius: 24,
            width: '100%',
            maxWidth: 560,
            overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(0,0,0,.3)',
            maxHeight: '92vh',
            overflowY: 'auto',
          }}
        >
          {/* Header */}
          <div style={{
            background: pkg.highlight ? '#1A1410' : '#F5F0E8',
            padding: 'clamp(20px, 4vw, 28px) clamp(20px, 4vw, 32px)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            position: 'sticky', top: 0, zIndex: 2,
          }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8, letterSpacing: '.2em', color: '#E8522A',
                marginBottom: 6, textTransform: 'uppercase',
              }}>
                [{pkg.num}] {t('pricing.modal.selectedPackage')}
              </div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(22px, 5vw, 32px)', fontWeight: 900,
                letterSpacing: -0.5, lineHeight: 1,
                color: pkg.highlight ? '#F5F0E8' : '#1A1410',
              }}>
                {pkg.name}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(24px, 5vw, 40px)', fontWeight: 900,
                color: '#E8522A', letterSpacing: -1, lineHeight: 1,
              }}>
                {pkg.price}
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  background: 'rgba(26,20,16,.08)', border: 'none', borderRadius: '50%',
                  width: 32, height: 32, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: pkg.highlight ? 'rgba(245,240,232,.5)' : 'rgba(26,20,16,.4)',
                  fontSize: 14, flexShrink: 0,
                }}
              >×</button>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: 'clamp(20px, 5vw, 32px)' }}>

            {step === 'form' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 900, color: '#1A1410',
                  letterSpacing: -0.3, marginBottom: 2,
                }}>
                  {t('pricing.modal.formTitle')}
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, color: '#888', lineHeight: 1.6, marginBottom: 4,
                }}>
                  {t('pricing.modal.formSub')}
                </div>

                {/* Name + Email — stacks on mobile via CSS class */}
                <div className="inquiry-form-grid">
                  <div>
                    <input
                      placeholder={t('pricing.modal.namePlaceholder')}
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      onFocus={e => { e.target.style.borderColor = '#E8522A' }}
                      onBlur={e => { e.target.style.borderColor = errors.name ? '#ef4444' : 'rgba(26,20,16,.12)' }}
                      style={inputStyle('name')}
                    />
                    {errors.name && <div style={{ fontSize: 9, color: '#ef4444', marginTop: 4, fontFamily: 'monospace' }}>{errors.name}</div>}
                  </div>
                  <div>
                    <input
                      placeholder={t('pricing.modal.emailPlaceholder')}
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      onFocus={e => { e.target.style.borderColor = '#E8522A' }}
                      onBlur={e => { e.target.style.borderColor = errors.email ? '#ef4444' : 'rgba(26,20,16,.12)' }}
                      style={inputStyle('email')}
                    />
                    {errors.email && <div style={{ fontSize: 9, color: '#ef4444', marginTop: 4, fontFamily: 'monospace' }}>{errors.email}</div>}
                  </div>
                </div>

                <input
                  placeholder={t('pricing.modal.phonePlaceholder')}
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  onFocus={e => { e.target.style.borderColor = '#E8522A' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(26,20,16,.12)' }}
                  style={inputStyle('phone')}
                />

                <div>
                  <textarea
                    placeholder={t('pricing.modal.descPlaceholder')}
                    value={form.desc}
                    onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
                    onFocus={e => { e.target.style.borderColor = '#E8522A' }}
                    onBlur={e => { e.target.style.borderColor = errors.desc ? '#ef4444' : 'rgba(26,20,16,.12)' }}
                    rows={4}
                    style={{ ...inputStyle('desc'), resize: 'vertical', minHeight: 90 } as React.CSSProperties}
                  />
                  {errors.desc && <div style={{ fontSize: 9, color: '#ef4444', marginTop: 4, fontFamily: 'monospace' }}>{errors.desc}</div>}
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  <button
                    onClick={onClose}
                    style={{
                      flex: 1, border: '1.5px solid rgba(26,20,16,.15)',
                      borderRadius: 999, padding: '12px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10, letterSpacing: '.1em',
                      color: 'rgba(26,20,16,.4)', background: 'transparent',
                      cursor: 'pointer', textTransform: 'uppercase', transition: 'all .2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#1A1410'; e.currentTarget.style.color = '#1A1410' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,20,16,.15)'; e.currentTarget.style.color = 'rgba(26,20,16,.4)' }}
                  >
                    {t('pricing.modal.cancel')}
                  </button>
                  <button
                    onClick={handleSubmit}
                    style={{
                      flex: 2, background: '#E8522A', color: 'white',
                      border: 'none', borderRadius: 999, padding: '12px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10, letterSpacing: '.1em',
                      cursor: 'pointer', textTransform: 'uppercase', transition: 'background .2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#c94420' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#E8522A' }}
                  >
                    {t('pricing.modal.submit')}
                  </button>
                </div>

                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 8, color: 'rgba(26,20,16,.25)',
                  letterSpacing: '.05em', textAlign: 'center',
                }}>
                  {t('pricing.modal.privacy')}
                </div>
              </div>
            )}

            {step === 'sending' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '40px 0' }}>
                <svg width="48" height="48" viewBox="0 0 96 96" style={{ animation: 'spin .8s linear infinite' }}>
                  <circle cx="48" cy="48" r="46" fill="#E8522A"/>
                  <circle cx="48" cy="48" r="28" fill="white"/>
                  <rect x="48" y="2" width="48" height="46" fill="white"/>
                  <rect x="48" y="48" width="48" height="46" fill="white"/>
                  <circle cx="48" cy="20" r="9" fill="#E8522A"/>
                  <circle cx="48" cy="20" r="4" fill="white"/>
                </svg>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888', letterSpacing: '.1em' }}>
                  {t('pricing.modal.sending')}
                </div>
              </div>
            )}

            {step === 'success' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '28px 0', textAlign: 'center' }}>
                <div style={{ fontSize: 44 }}>🎉</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 34, fontWeight: 900, color: '#1A1410', letterSpacing: -0.5 }}>
                  {t('pricing.modal.successTitle')}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888', lineHeight: 1.7, maxWidth: 360 }}>
                  {t('pricing.modal.successMsg', { name: form.name, package: pkg.name })}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'rgba(26,20,16,.3)', letterSpacing: '.08em' }}>
                  {t('pricing.modal.successConfirm', { email: form.email })}
                </div>
                <button
                  onClick={onClose}
                  style={{
                    marginTop: 12, border: '1.5px solid #1A1410', borderRadius: 999,
                    padding: '11px 28px', fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10, letterSpacing: '.1em', color: '#1A1410',
                    background: 'transparent', cursor: 'pointer', textTransform: 'uppercase', transition: 'all .2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1A1410'; e.currentTarget.style.color = '#F5F0E8' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1A1410' }}
                >
                  {t('pricing.modal.successClose')}
                </button>
              </div>
            )}

            {step === 'error' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '28px 0', textAlign: 'center' }}>
                <div style={{ fontSize: 44 }}>😕</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 30, fontWeight: 900, color: '#1A1410' }}>
                  {t('pricing.modal.errorTitle')}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888', lineHeight: 1.7 }}>
                  {t('pricing.modal.errorMsg')}<br/>
                  <a href="mailto:contact@co-studio.at" style={{ color: '#E8522A', textDecoration: 'none' }}>
                    contact@co-studio.at
                  </a>
                </div>
                <button
                  onClick={() => setStep('form')}
                  style={{
                    marginTop: 4, border: '1.5px solid #E8522A', borderRadius: 999,
                    padding: '11px 28px', fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10, letterSpacing: '.1em', color: '#E8522A',
                    background: 'transparent', cursor: 'pointer', textTransform: 'uppercase',
                  }}
                >
                  {t('pricing.modal.retry')}
                </button>
              </div>
            )}

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
