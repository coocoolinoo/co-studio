let audioCtx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  }
  return audioCtx
}

export function isSoundEnabled(): boolean {
  return localStorage.getItem('co-studio-sound') !== 'off'
}

export function playClick() {
  if (!isSoundEnabled()) return
  try {
    const ctx = getCtx()
    const now = ctx.currentTime

    // ── 1. Sharp click transient (the "actuation" moment) ────────────────────
    const clickBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.012), ctx.sampleRate)
    const clickData = clickBuf.getChannelData(0)
    for (let i = 0; i < clickData.length; i++) {
      clickData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / clickData.length, 12)
    }
    const clickSrc = ctx.createBufferSource()
    clickSrc.buffer = clickBuf
    const clickFilter = ctx.createBiquadFilter()
    clickFilter.type = 'bandpass'
    clickFilter.frequency.value = 4500
    clickFilter.Q.value = 0.6
    const clickGain = ctx.createGain()
    clickGain.gain.setValueAtTime(0.35, now)
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.01)
    clickSrc.connect(clickFilter)
    clickFilter.connect(clickGain)
    clickGain.connect(ctx.destination)
    clickSrc.start(now)
    clickSrc.stop(now + 0.012)

    // ── 2. Bottom-out thud (key hitting the plate) ───────────────────────────
    const thudBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.06), ctx.sampleRate)
    const thudData = thudBuf.getChannelData(0)
    for (let i = 0; i < thudData.length; i++) {
      thudData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / thudData.length, 3)
    }
    const thudSrc = ctx.createBufferSource()
    thudSrc.buffer = thudBuf
    const thudFilter = ctx.createBiquadFilter()
    thudFilter.type = 'bandpass'
    thudFilter.frequency.value = 900
    thudFilter.Q.value = 1.2
    const thudGain = ctx.createGain()
    thudGain.gain.setValueAtTime(0.22, now + 0.006)
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)
    thudSrc.connect(thudFilter)
    thudFilter.connect(thudGain)
    thudGain.connect(ctx.destination)
    thudSrc.start(now + 0.006)
    thudSrc.stop(now + 0.06)

    // ── 3. Plate resonance (the deep body "thock") ───────────────────────────
    const plate = ctx.createOscillator()
    plate.type = 'sine'
    plate.frequency.setValueAtTime(160, now + 0.006)
    plate.frequency.exponentialRampToValueAtTime(70, now + 0.055)
    const plateGain = ctx.createGain()
    plateGain.gain.setValueAtTime(0.14, now + 0.006)
    plateGain.gain.exponentialRampToValueAtTime(0.001, now + 0.055)
    plate.connect(plateGain)
    plateGain.connect(ctx.destination)
    plate.start(now + 0.006)
    plate.stop(now + 0.055)
  } catch { /* silent fail */ }
}

export function playHover() {
  if (!isSoundEnabled()) return
  try {
    const ctx = getCtx()
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, now)
    osc.frequency.exponentialRampToValueAtTime(1000, now + 0.04)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.04, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.04)
  } catch { /* silent fail */ }
}

export function playSuccess() {
  if (!isSoundEnabled()) return
  try {
    const ctx = getCtx()
    const now = ctx.currentTime
    const notes = [523, 659, 784, 1047]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = freq
      const gain = ctx.createGain()
      const t = now + i * 0.1
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.12, t + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(t)
      osc.stop(t + 0.3)
    })
  } catch { /* silent fail */ }
}

export function playWhoosh(direction: 'next' | 'prev' = 'next') {
  if (!isSoundEnabled()) return
  try {
    const ctx = getCtx()
    const now = ctx.currentTime

    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.25, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2)
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.Q.value = 1.2

    if (direction === 'next') {
      filter.frequency.setValueAtTime(200, now)
      filter.frequency.exponentialRampToValueAtTime(1800, now + 0.2)
    } else {
      filter.frequency.setValueAtTime(1800, now)
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.2)
    }

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.12, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    noise.start(now)
    noise.stop(now + 0.25)
  } catch { /* silent fail */ }
}

export function playNavigate() {
  if (!isSoundEnabled()) return
  try {
    const ctx = getCtx()
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(400, now)
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.12)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.08, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.12)
  } catch { /* silent fail */ }
}
