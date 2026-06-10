import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

const BRAND = {
  bg: 0xf5f0e8,
  ink: 0x1a1410,
  accent: 0xe8522a,
  warm: 0xf0b429,
  white: 0xffffff,
  concrete: 0xd4cfc7,
  wall: 0xf5f0e8,
  floor: 0xe0dbd3,
}

const CONTENT = {
  hero: 'WE BUILD',
  hero2: 'digital THINGS ツ',
  about: 'Corneliu Secrieri — Entwickler & Designer aus Wien. co-studio.',
  projects: [
    { name: 'πf(x)', type: 'Hardware · DSP', year: '2024', color: 0x1a1a2e },
    { name: 'co.bible', type: 'Mobile App', year: '2024', color: 0x2a3a2b },
    { name: 'Bibelsuche', type: 'Desktop App', year: '2025', color: 0x0f172a },
    { name: 'VS Mannersdorf', type: 'Web', year: '2025', color: 0xf8f5f0 },
    { name: 'AL Zeichenbüro', type: 'Web', year: '2026', color: 0x1a1a2a },
  ],
  stats: [
    { n: '24+', label: 'Projekte' },
    { n: '18+', label: 'Kunden' },
    { n: '15+', label: 'Technologien' },
    { n: '3+', label: 'Jahre' },
  ],
  services: ['WEB', 'APP', 'DESIGN'],
  contact: {
    email: 'contact@co-studio.at',
    website: 'co-studio.at',
    location: 'Wien, Österreich',
  },
  closing: "LET'S BUILD SOMETHING GREAT ツ",
}

const ROOM_NAMES = ['EMPFANG', 'KORRIDOR', 'GALERIE', 'MEETING', 'ROOFTOP']

const PROJECTS_OVERLAY = [
  {
    num: '01', name: 'πf(x)',
    type: 'Hardware · DSP', year: '2024',
    desc: 'Audio-Multi-Effektgerät auf Basis eines Raspberry Pi. Echtzeit-DSP in C++.',
    tags: ['C++', 'Raspberry Pi', 'DSP', 'Linux'],
    color: '#1A1A2E', textColor: '#F5F0E8',
    hasDemo: false,
  },
  {
    num: '02', name: 'co.bible',
    type: 'Mobile App', year: '2024',
    desc: 'Mobile Bible reader — React Native, offline-first. Suche, Leseplan, Tagesvers.',
    tags: ['React Native', 'Expo', 'SQLite'],
    color: '#2A3A2B', textColor: '#F5F0E8',
    hasDemo: true,
  },
  {
    num: '03', name: 'Bibelsuche',
    type: 'Desktop App', year: '2025',
    desc: 'Desktop-App für macOS & Windows. Bibelverse blitzschnell suchen.',
    tags: ['Tauri', 'React', 'Rust'],
    color: '#0F172A', textColor: '#F5F0E8',
    hasDemo: true,
  },
  {
    num: '04', name: 'VS Mannersdorf',
    type: 'Web', year: '2025',
    desc: 'Moderne React-Website für die Volksschule Mannersdorf am Leithagebirge.',
    tags: ['React', 'Vite', 'CSS Modules'],
    color: '#F8F5F0', textColor: '#1A1410',
    hasDemo: true,
  },
  {
    num: '05', name: 'AL Zeichenbüro',
    type: 'Web', year: '2026',
    desc: 'Webauftritt für ein Architekturbüro in Wiener Neustadt.',
    tags: ['React', 'Vite', 'Design'],
    color: '#1A1A2A', textColor: '#F5F0E8',
    hasDemo: true,
  },
]

const WAYPOINTS_DESKTOP: { pos: THREE.Vector3; look: THREE.Vector3 }[] = [
  { pos: new THREE.Vector3(0, 1.6, -10), look: new THREE.Vector3(0, 1.5, 0) },
  { pos: new THREE.Vector3(0, 1.6, -5), look: new THREE.Vector3(0, 1.5, 3) },
  { pos: new THREE.Vector3(0, 1.6, 1), look: new THREE.Vector3(0, 1.8, 6) },
  { pos: new THREE.Vector3(0, 1.6, 8), look: new THREE.Vector3(0, 1.5, 14) },
  { pos: new THREE.Vector3(0, 1.6, 14), look: new THREE.Vector3(0, 1.5, 22) },
  { pos: new THREE.Vector3(0, 1.6, 20), look: new THREE.Vector3(0, 1.5, 30) },
  { pos: new THREE.Vector3(0, 1.6, 28), look: new THREE.Vector3(0, 1.5, 36) },
  { pos: new THREE.Vector3(0, 1.6, 34), look: new THREE.Vector3(0, 1.5, 42) },
  { pos: new THREE.Vector3(0, 1.6, 40), look: new THREE.Vector3(0, 1.5, 48) },
  { pos: new THREE.Vector3(0, 1.6, 48), look: new THREE.Vector3(0, 1.5, 54) },
  { pos: new THREE.Vector3(0, 1.6, 54), look: new THREE.Vector3(0, 1.2, 58) },
  { pos: new THREE.Vector3(0, 2.8, 64), look: new THREE.Vector3(0, 1.5, 70) },
  { pos: new THREE.Vector3(0, 2.2, 72), look: new THREE.Vector3(0, 1.0, 78) },
]

const WAYPOINTS_MOBILE: { pos: THREE.Vector3; look: THREE.Vector3 }[] = [
  { pos: new THREE.Vector3(0, 1.6, -8), look: new THREE.Vector3(0, 1.5, 2) },
  { pos: new THREE.Vector3(0, 1.6, 2), look: new THREE.Vector3(0, 1.5, 10) },
  { pos: new THREE.Vector3(0, 1.6, 12), look: new THREE.Vector3(0, 1.5, 22) },
  { pos: new THREE.Vector3(0, 1.6, 24), look: new THREE.Vector3(0, 1.5, 34) },
  { pos: new THREE.Vector3(0, 1.6, 36), look: new THREE.Vector3(0, 1.5, 44) },
  { pos: new THREE.Vector3(0, 1.6, 48), look: new THREE.Vector3(0, 1.5, 54) },
  { pos: new THREE.Vector3(0, 2.5, 68), look: new THREE.Vector3(0, 1.0, 76) },
]

type Disposable = { geo?: THREE.BufferGeometry; mat?: THREE.Material | THREE.Material[] }

const MAT = {
  wall: new THREE.MeshBasicMaterial({ color: 0xede8e0 }),
  floor: new THREE.MeshBasicMaterial({ color: 0xd8d3cb }),
  ceiling: new THREE.MeshBasicMaterial({ color: 0xf5f2ec }),
  concrete: new THREE.MeshBasicMaterial({ color: 0xc8c3bb }),
  accent: new THREE.MeshBasicMaterial({ color: 0xe8522a }),
  dark: new THREE.MeshBasicMaterial({ color: 0x1a1410 }),
  warm: new THREE.MeshBasicMaterial({ color: 0xf0b429 }),
  glass: new THREE.MeshBasicMaterial({ color: 0xc8d8e8, transparent: true, opacity: 0.2 }),
  green: new THREE.MeshBasicMaterial({ color: 0x3a5a3b }),
  metal: new THREE.MeshBasicMaterial({ color: 0x888880 }),
  darkScreen: new THREE.MeshBasicMaterial({ color: 0x111111 }),
  white: new THREE.MeshBasicMaterial({ color: 0xffffff }),
}

type LogoAnimRefs = {
  dot: THREE.Object3D
  innerDot: THREE.Object3D
  orbitRadius: number
}

function getQuality() {
  const isMobile = window.innerWidth < 768
  const isLowEnd = navigator.hardwareConcurrency <= 4
  return {
    isMobile,
    pixelRatio: isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5),
    particles: isMobile || isLowEnd ? 200 : 500,
    sphereSegs: isMobile || isLowEnd ? 10 : 16,
    torusSegs: isMobile || isLowEnd ? 30 : 40,
    fogDensity: isMobile ? 0.028 : 0.018,
    lerpFactor: isMobile ? 0.08 : 0.04,
    antialias: !isMobile && window.devicePixelRatio < 2,
  }
}

const _matrix = new THREE.Matrix4()

class GeomCollector {
  private buckets = new Map<string, THREE.BufferGeometry[]>()

  box(key: string, w: number, h: number, d: number, x: number, y: number, z: number) {
    const geo = new THREE.BoxGeometry(w, h, d)
    _matrix.makeTranslation(x, y, z)
    geo.applyMatrix4(_matrix)
    const list = this.buckets.get(key) ?? []
    list.push(geo)
    this.buckets.set(key, list)
  }

  boxTransformed(
    key: string,
    w: number, h: number, d: number,
    lx: number, ly: number, lz: number,
    px: number, py: number, pz: number,
    rotY: number
  ) {
    const geo = new THREE.BoxGeometry(w, h, d)
    const local = new THREE.Matrix4().makeTranslation(lx, ly, lz)
    const rot = new THREE.Matrix4().makeRotationY(rotY)
    const parent = new THREE.Matrix4().makeTranslation(px, py, pz)
    _matrix.multiplyMatrices(parent, rot).multiply(local)
    geo.applyMatrix4(_matrix)
    const list = this.buckets.get(key) ?? []
    list.push(geo)
    this.buckets.set(key, list)
  }

  screen(color: number, w: number, h: number, d: number, x: number, y: number, z: number) {
    this.box(`screen_${color.toString(16)}`, w, h, d, x, y, z)
  }

  flush(
    scene: THREE.Scene,
    materials: Map<string, THREE.Material>,
    disposables: Disposable[]
  ) {
    for (const [key, geos] of this.buckets) {
      if (geos.length === 0) continue
      const merged = mergeGeometries(geos, false)
      geos.forEach(g => g.dispose())
      if (!merged) continue
      const mat = materials.get(key)
      if (!mat) continue
      const mesh = new THREE.Mesh(merged, mat)
      scene.add(mesh)
      disposables.push({ geo: merged, mat })
    }
  }
}

function buildMaterials(): Map<string, THREE.Material> {
  const map = new Map<string, THREE.Material>()
  map.set('wall', MAT.wall)
  map.set('floor', MAT.floor)
  map.set('ceiling', MAT.ceiling)
  map.set('concrete', MAT.concrete)
  map.set('accent', MAT.accent)
  map.set('dark', MAT.dark)
  map.set('green', MAT.green)
  map.set('darkScreen', MAT.darkScreen)
  map.set('glass', MAT.glass)
  map.set('white', MAT.white)
  CONTENT.projects.forEach(p => {
    map.set(`screen_${p.color.toString(16)}`, new THREE.MeshBasicMaterial({ color: p.color }))
  })
  return map
}

function buildB1Logo(
  scene: THREE.Scene,
  disposables: Disposable[],
  x: number,
  y: number,
  z: number,
  scale = 1
): LogoAnimRefs {
  const group = new THREE.Group()
  group.name = 'empfangLogo'
  group.position.set(x, y, z)
  group.rotation.y = Math.PI

  const outerGeo = new THREE.TorusGeometry(1.0 * scale, 0.08 * scale, 12, 60)
  const outerMat = new THREE.MeshBasicMaterial({ color: 0x1a1410 })
  group.add(new THREE.Mesh(outerGeo, outerMat))
  disposables.push({ geo: outerGeo, mat: outerMat })

  const innerGeo = new THREE.CircleGeometry(0.65 * scale, 32)
  const innerMat = new THREE.MeshBasicMaterial({ color: 0xf5f0e8, side: THREE.DoubleSide })
  group.add(new THREE.Mesh(innerGeo, innerMat))
  disposables.push({ geo: innerGeo, mat: innerMat })

  const maskGeo = new THREE.BoxGeometry(0.75 * scale, 1.6 * scale, 0.02)
  const maskMat = new THREE.MeshBasicMaterial({ color: 0xf5f0e8 })
  const mask = new THREE.Mesh(maskGeo, maskMat)
  mask.position.set(0.38 * scale, 0, 0.005)
  group.add(mask)
  disposables.push({ geo: maskGeo, mat: maskMat })

  const dotGeo = new THREE.CircleGeometry(0.18 * scale, 24)
  const dotMat = new THREE.MeshBasicMaterial({ color: 0xe8522a, side: THREE.DoubleSide })
  const dot = new THREE.Mesh(dotGeo, dotMat)
  dot.position.set(0, 1.0 * scale, 0.01)
  dot.name = 'logoDot'
  group.add(dot)
  disposables.push({ geo: dotGeo, mat: dotMat })

  const innerDotGeo = new THREE.CircleGeometry(0.08 * scale, 24)
  const innerDotMat = new THREE.MeshBasicMaterial({ color: 0x1a1410, side: THREE.DoubleSide })
  const innerDot = new THREE.Mesh(innerDotGeo, innerDotMat)
  innerDot.position.set(0, 1.0 * scale, 0.02)
  innerDot.name = 'logoInnerDot'
  group.add(innerDot)
  disposables.push({ geo: innerDotGeo, mat: innerDotMat })

  scene.add(group)

  return { dot, innerDot, orbitRadius: 1.0 * scale }
}

function buildLogoGlow(scene: THREE.Scene, disposables: Disposable[], x: number, y: number, z: number, scale: number) {
  const glowGeo = new THREE.CircleGeometry(1.8 * scale, 32)
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xe8522a,
    transparent: true,
    opacity: 0.06,
    side: THREE.DoubleSide,
  })
  const glow = new THREE.Mesh(glowGeo, glowMat)
  glow.position.set(x, y, z)
  glow.rotation.y = Math.PI
  scene.add(glow)
  disposables.push({ geo: glowGeo, mat: glowMat })
}

type ProjectData = (typeof CONTENT.projects)[number]

function buildProjectFrame(
  scene: THREE.Scene,
  disposables: Disposable[],
  project: ProjectData,
  x: number,
  y: number,
  z: number,
  facingRight: boolean
) {
  const group = new THREE.Group()
  group.position.set(x, y, z)
  group.rotation.y = facingRight ? Math.PI / 2 : -Math.PI / 2

  const frameGeo = new THREE.BoxGeometry(2.8, 2.0, 0.06)
  group.add(new THREE.Mesh(frameGeo, MAT.dark))
  disposables.push({ geo: frameGeo, mat: MAT.dark })

  const screenGeo = new THREE.BoxGeometry(2.5, 1.7, 0.04)
  const screenMat = new THREE.MeshBasicMaterial({ color: project.color })
  const screen = new THREE.Mesh(screenGeo, screenMat)
  screen.position.set(0, 0.05, 0.04)
  group.add(screen)
  disposables.push({ geo: screenGeo, mat: screenMat })

  const barGeo = new THREE.BoxGeometry(2.5, 0.08, 0.05)
  const bar = new THREE.Mesh(barGeo, MAT.accent)
  bar.position.set(0, 0.85, 0.05)
  group.add(bar)
  disposables.push({ geo: barGeo, mat: MAT.accent })

  const yearGeo = new THREE.BoxGeometry(0.5, 0.18, 0.05)
  const yearMat = new THREE.MeshBasicMaterial({ color: 0xe8522a, transparent: true, opacity: 0.7 })
  const yearBadge = new THREE.Mesh(yearGeo, yearMat)
  yearBadge.position.set(0.9, -0.65, 0.05)
  group.add(yearBadge)
  disposables.push({ geo: yearGeo, mat: yearMat })

  const lineColors = [
    { w: 1.6, y: 0.5, opacity: 0.9 },
    { w: 0.9, y: 0.25, opacity: 0.4 },
    { w: 1.1, y: 0.05, opacity: 0.3 },
    { w: 0.7, y: -0.15, opacity: 0.2 },
  ]
  lineColors.forEach(l => {
    const isTitle = l.opacity > 0.8
    const lineGeo = new THREE.BoxGeometry(l.w, isTitle ? 0.14 : 0.07, 0.04)
    const lineMat = new THREE.MeshBasicMaterial({
      color: project.color === 0xf8f5f0 ? 0x1a1410 : 0xf5f0e8,
      transparent: true,
      opacity: l.opacity,
    })
    const line = new THREE.Mesh(lineGeo, lineMat)
    line.position.set(-0.4, l.y, 0.05)
    group.add(line)
    disposables.push({ geo: lineGeo, mat: lineMat })
  })

  const accentGeo = new THREE.BoxGeometry(2.8, 0.05, 0.05)
  const accentLine = new THREE.Mesh(accentGeo, MAT.accent)
  accentLine.position.set(0, -1.05, 0)
  group.add(accentLine)
  disposables.push({ geo: accentGeo, mat: MAT.accent })

  const plateGeo = new THREE.BoxGeometry(1.4, 0.22, 0.04)
  const plate = new THREE.Mesh(plateGeo, MAT.concrete)
  plate.position.set(0, -1.3, 0)
  group.add(plate)
  disposables.push({ geo: plateGeo, mat: MAT.concrete })

  scene.add(group)
}

type StatData = (typeof CONTENT.stats)[number]

function buildStatCard(
  scene: THREE.Scene,
  disposables: Disposable[],
  _stat: StatData,
  x: number,
  y: number,
  z: number
) {
  const group = new THREE.Group()
  group.position.set(x, y, z)
  group.rotation.y = Math.PI

  const cardGeo = new THREE.BoxGeometry(2.2, 2.6, 0.06)
  const cardMat = new THREE.MeshBasicMaterial({ color: 0xf5f0e8 })
  group.add(new THREE.Mesh(cardGeo, cardMat))
  disposables.push({ geo: cardGeo, mat: cardMat })

  const numColor = MAT.dark
  ;[0.6, 0.2, -0.2].forEach(barY => {
    const barGeo = new THREE.BoxGeometry(1.4, 0.22, 0.07)
    const bar = new THREE.Mesh(barGeo, numColor)
    bar.position.set(0, barY, 0.05)
    group.add(bar)
    disposables.push({ geo: barGeo, mat: numColor })
  })

  const accentGeo = new THREE.BoxGeometry(2.2, 0.08, 0.07)
  const accent = new THREE.Mesh(accentGeo, MAT.accent)
  accent.position.set(0, -1.1, 0.05)
  group.add(accent)
  disposables.push({ geo: accentGeo, mat: MAT.accent })

  const labelGeo = new THREE.BoxGeometry(1.6, 0.2, 0.07)
  const labelMat = new THREE.MeshBasicMaterial({ color: 0xd4cfc7 })
  const label = new THREE.Mesh(labelGeo, labelMat)
  label.position.set(0, -0.7, 0.05)
  group.add(label)
  disposables.push({ geo: labelGeo, mat: labelMat })

  scene.add(group)
}

function buildLetterPanels(
  collector: GeomCollector,
  text: string,
  x: number, y: number, z: number,
  rotY = 0
) {
  const letterW = 0.35
  const gap = 0.12
  let idx = 0
  text.split('').forEach(ch => {
    if (ch === ' ' || ch === '.') { idx += 0.6; return }
    const h = ch === 'ツ' ? 0.5 : 0.7
    collector.boxTransformed('dark', letterW, h, 0.08, idx * (letterW + gap), h / 2, 0, x, y, z, rotY)
    idx++
  })
}

function buildRoom0(
  collector: GeomCollector,
  scene: THREE.Scene,
  disposables: Disposable[]
): LogoAnimRefs {
  collector.box('floor', 12, 0.15, 14, 0, 0, 0)
  collector.box('wall', 0.2, 4, 14, -6, 2, 0)
  collector.box('wall', 0.2, 4, 14, 6, 2, 0)
  collector.box('wall', 12, 4, 0.2, 0, 2, -7)
  collector.box('ceiling', 12, 0.15, 14, 0, 4, 0)
  collector.box('accent', 0.08, 4, 0.3, -5.9, 2, 0)
  collector.box('dark', 3.5, 0.9, 1.2, 0, 0.45, 3)
  collector.box('accent', 3.6, 0.06, 1.25, 0, 0.93, 3)
  const logoAnim = buildB1Logo(scene, disposables, 0, 2.8, -7.7, 1.4)
  buildLogoGlow(scene, disposables, 0, 2.8, -7.65, 1.4)
  buildLetterPanels(collector, 'CO-STUDIO', -2.5, 1.8, -6.3)
  ;[-3.5, 3.5].forEach(px => {
    collector.box('dark', 0.6, 0.5, 0.6, px, 0.25, 5)
    collector.box('green', 0.5, 0.6, 0.5, px, 0.85, 5)
  })
  return logoAnim
}

function buildRoom1(collector: GeomCollector) {
  const zOff = 10
  collector.box('ceiling', 6, 0.15, 18, 0, 0, zOff + 9)
  collector.box('wall', 0.2, 3.5, 18, -3.1, 1.75, zOff + 9)
  collector.box('wall', 0.2, 3.5, 18, 3.1, 1.75, zOff + 9)
  collector.box('ceiling', 6, 0.15, 18, 0, 3.5, zOff + 9)
  CONTENT.projects.slice(0, 3).forEach((p, i) => {
    const z = zOff + 4 + i * 4
    collector.box('dark', 0.12, 1.4, 1.0, -2.8, 1.5, z)
    collector.screen(p.color, 0.9, 0.7, 0.04, -2.8, 1.5, z + 0.52)
  })
  collector.box('concrete', 1.5, 2.5, 0.15, 2.8, 1.8, zOff + 10)
  collector.box('dark', 0.8, 0.08, 6, 0, 3.4, zOff + 9)
}

function buildRoom2(collector: GeomCollector, scene: THREE.Scene, disposables: Disposable[]) {
  const zOff = 28
  const galleryZ = zOff + 8
  collector.box('wall', 10, 0.15, 16, 0, 0, galleryZ)
  collector.box('wall', 0.2, 4, 16, -5.1, 2, galleryZ)
  collector.box('wall', 0.2, 4, 16, 5.1, 2, galleryZ)
  collector.box('ceiling', 10, 0.15, 16, 0, 4, galleryZ)
  collector.box('white', 0.8, 0.9, 0.8, 0, 0.45, galleryZ)

  const cubeGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8)
  const cubeMat = new THREE.MeshBasicMaterial({ color: 0xe8522a })
  const galleryCube = new THREE.Mesh(cubeGeo, cubeMat)
  galleryCube.position.set(0, 1.4, galleryZ)
  galleryCube.userData.isClickable = true
  galleryCube.userData.type = 'projectsButton'
  scene.add(galleryCube)
  disposables.push({ geo: cubeGeo, mat: cubeMat })

  buildProjectFrame(scene, disposables, CONTENT.projects[0], -5.5, 2.6, zOff + 1, true)
  buildProjectFrame(scene, disposables, CONTENT.projects[1], -5.5, 2.6, zOff + 6, true)
  buildProjectFrame(scene, disposables, CONTENT.projects[2], -5.5, 2.6, zOff + 11, true)
  buildProjectFrame(scene, disposables, CONTENT.projects[3], 5.5, 2.6, zOff + 3.5, false)
  buildProjectFrame(scene, disposables, CONTENT.projects[4], 5.5, 2.6, zOff + 9.5, false)

  return galleryCube
}

function buildRoom3(collector: GeomCollector, scene: THREE.Scene, disposables: Disposable[]) {
  const zOff = 46
  collector.box('ceiling', 10, 0.15, 12, 0, 0, zOff + 6)
  collector.box('wall', 0.2, 3.5, 12, -5.1, 1.75, zOff + 6)
  collector.box('wall', 0.2, 3.5, 12, 5.1, 1.75, zOff + 6)
  collector.box('ceiling', 10, 0.15, 12, 0, 3.5, zOff + 6)
  collector.box('dark', 6, 0.12, 1.8, 0, 0.75, zOff + 6)
  ;[-2.2, -0.8, 0.8, 2.2].forEach(px => {
    ;[-1.5, 1.5].forEach(pz => {
      collector.box('dark', 0.45, 0.5, 0.45, px, 0.25, zOff + 6 + pz)
    })
  })
  CONTENT.stats.forEach((stat, i) => {
    buildStatCard(scene, disposables, stat, -4.5 + i * 3, 2.8, zOff + 0.5)
  })
  collector.box('darkScreen', 3, 1.6, 0.08, 0, 1.5, zOff + 0.3)
  collector.box('glass', 0.08, 2.5, 4, 4.9, 1.5, zOff + 6)
  collector.box('accent', 0.12, 2.6, 4.1, 4.85, 1.5, zOff + 6)
}

function buildRoom4(
  collector: GeomCollector,
  quality: ReturnType<typeof getQuality>,
  scene: THREE.Scene,
  disposables: Disposable[]
) {
  const zOff = 62
  collector.box('concrete', 14, 0.2, 14, 0, 0, zOff + 8)
  ;[[-6, zOff], [6, zOff], [-6, zOff + 14], [6, zOff + 14]].forEach(([x, z]) => {
    collector.box('concrete', 3, 1, 0.3, x, 0.5, z + 7)
  })
  buildLetterPanels(collector, "LET'S BUILD", -3, 1.2, zOff + 14.5, Math.PI)
  buildLetterPanels(collector, 'GREAT', 1.5, 1.2, zOff + 14.5, Math.PI)
  ;[-3, 3].forEach(x => {
    collector.box('dark', 1.8, 0.35, 0.8, x, 0.2, zOff + 5)
    collector.box('green', 0.6, 0.5, 0.6, x - 2.5, 0.5, zOff + 12)
    collector.box('green', 0.6, 0.5, 0.6, x + 2.5, 0.5, zOff + 3)
  })

  const contactItems = [
    { color: 0xe8522a, width: 3.0 },
    { color: 0x1a1410, width: 2.0 },
    { color: 0xd4cfc7, width: 1.5 },
  ]
  contactItems.forEach((item, i) => {
    const panelGeo = new THREE.BoxGeometry(item.width, 0.28, 0.1)
    const panelMat = new THREE.MeshBasicMaterial({ color: item.color })
    const panel = new THREE.Mesh(panelGeo, panelMat)
    panel.position.set(-1 + i * 0.3, 1.5 - i * 0.4, zOff + 13.85)
    scene.add(panel)
    disposables.push({ geo: panelGeo, mat: panelMat })
  })

  const floorLogoGeo = new THREE.CircleGeometry(2.0, 32)
  const floorLogoMat = new THREE.MeshBasicMaterial({ color: 0xe8522a, side: THREE.DoubleSide })
  const floorLogo = new THREE.Mesh(floorLogoGeo, floorLogoMat)
  floorLogo.rotation.x = -Math.PI / 2
  floorLogo.position.set(0, 0.02, zOff + 6)
  scene.add(floorLogo)
  disposables.push({ geo: floorLogoGeo, mat: floorLogoMat })

  const floorLogoInnerGeo = new THREE.CircleGeometry(1.3, 32)
  const floorLogoInnerMat = new THREE.MeshBasicMaterial({ color: 0xcdc8c0, side: THREE.DoubleSide })
  const floorLogoInner = new THREE.Mesh(floorLogoInnerGeo, floorLogoInnerMat)
  floorLogoInner.rotation.x = -Math.PI / 2
  floorLogoInner.position.set(0, 0.03, zOff + 6)
  scene.add(floorLogoInner)
  disposables.push({ geo: floorLogoInnerGeo, mat: floorLogoInnerMat })

  const positions = new Float32Array(quality.particles * 3)
  for (let i = 0; i < quality.particles; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = Math.random() * 6 + 1
    positions[i * 3 + 2] = zOff + Math.random() * 14
  }
  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const pMat = new THREE.PointsMaterial({ color: BRAND.warm, size: 0.04, transparent: true, opacity: 0.5 })
  scene.add(new THREE.Points(pGeo, pMat))
  disposables.push({ geo: pGeo, mat: pMat })
}

function buildScene(scene: THREE.Scene, quality: ReturnType<typeof getQuality>) {
  const disposables: Disposable[] = []
  const collector = new GeomCollector()
  const materials = buildMaterials()

  scene.add(new THREE.AmbientLight(0xfff5e8, 1.0))
  scene.add(new THREE.HemisphereLight(0xfff8f0, 0xe0d8c8, 0.8))

  const logoAnim = buildRoom0(collector, scene, disposables)
  buildRoom1(collector)
  const galleryCube = buildRoom2(collector, scene, disposables)
  buildRoom3(collector, scene, disposables)
  buildRoom4(collector, quality, scene, disposables)

  collector.flush(scene, materials, disposables)

  return { disposables, logoAnim, galleryCube }
}

function lerpWaypoints(
  waypoints: { pos: THREE.Vector3; look: THREE.Vector3 }[],
  t: number,
  targetPos: THREE.Vector3,
  targetLook: THREE.Vector3
) {
  const scaled = t * (waypoints.length - 1)
  const i = Math.min(Math.floor(scaled), waypoints.length - 2)
  const f = scaled - i
  targetPos.lerpVectors(waypoints[i].pos, waypoints[i + 1].pos, f)
  targetLook.lerpVectors(waypoints[i].look, waypoints[i + 1].look, f)
}

function scrollToRoom(t: number): number {
  if (t < 0.2) return 0
  if (t < 0.4) return 1
  if (t < 0.6) return 2
  if (t < 0.8) return 3
  return 4
}

export default function Experience() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const setProjectsOpenRef = useRef<(open: boolean) => void>(() => {})
  const [roomIndex, setRoomIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBack, setShowBack] = useState(false)
  const [isPortrait, setIsPortrait] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)

  setProjectsOpenRef.current = setProjectsOpen

  const isNearGallery = scrollProgress > 0.32 && scrollProgress < 0.68 && !projectsOpen

  useEffect(() => {
    const t = setTimeout(() => setShowBack(true), 2000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProjectsOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const onResize = useCallback(() => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)
    setIsPortrait(window.innerHeight > window.innerWidth)
  }, [])

  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [onResize])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const quality = getQuality()
    const waypoints = quality.isMobile ? WAYPOINTS_MOBILE : WAYPOINTS_DESKTOP

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: quality.antialias,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(quality.pixelRatio)
    renderer.shadowMap.enabled = false
    renderer.shadowMap.autoUpdate = false
    renderer.toneMapping = THREE.NoToneMapping
    renderer.toneMappingExposure = 1
    renderer.setClearColor(0xf0ebe0, 1)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0xf0ebe0, quality.fogDensity)

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 120)
    camera.position.copy(waypoints[0].pos)

    const { disposables, logoAnim, galleryCube } = buildScene(scene, quality)

    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    let isHoveringCube = false
    const cur = document.querySelector<HTMLElement>('.custom-cursor')
    const cubeMat = galleryCube.material as THREE.MeshBasicMaterial
    const cubeBaseY = 1.4

    let mouseX = 0
    let mouseY = 0
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const onClick = () => {
      if (isHoveringCube) setProjectsOpenRef.current(true)
    }

    let touchStartY = 0
    let touchStartX = 0
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartX = e.touches[0].clientX
    }
    const onTouchMove = (e: TouchEvent) => {
      const delta = touchStartY - e.touches[0].clientY
      window.scrollBy(0, delta * 1.2)
      touchStartY = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0]
      if (!touch) return
      const dx = Math.abs(touch.clientX - touchStartX)
      const dy = Math.abs(touch.clientY - touchStartY)
      if (dx > 14 || dy > 14) return
      pointer.x = (touch.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(touch.clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(pointer, camera)
      if (raycaster.intersectObject(galleryCube).length > 0) {
        setProjectsOpenRef.current(true)
      }
    }

    const targetPos = new THREE.Vector3()
    const targetLook = new THREE.Vector3()
    const currentPos = new THREE.Vector3().copy(waypoints[0].pos)
    const currentLook = new THREE.Vector3().copy(waypoints[0].look)

    let targetScroll = 0
    let scrollLerp = 0
    let lastScrollY = -1
    let lastMX = -1
    let lastMY = -1
    let needsRender = true
    let lastFrameTime = 0

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      targetScroll = max > 0 ? window.scrollY / max : 0
      setScrollProgress(targetScroll)
      setRoomIndex(scrollToRoom(targetScroll))
    }

    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      needsRender = true
    }

    let animId = 0

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate)
      if (now - lastFrameTime < 16.67) return
      lastFrameTime = now

      if (
        Math.abs(window.scrollY - lastScrollY) > 0.5 ||
        Math.abs(mouseX - lastMX) > 0.01 ||
        Math.abs(mouseY - lastMY) > 0.01
      ) {
        needsRender = true
        lastScrollY = window.scrollY
        lastMX = mouseX
        lastMY = mouseY
      }

      const prevScrollLerp = scrollLerp
      scrollLerp += (targetScroll - scrollLerp) * quality.lerpFactor
      if (Math.abs(scrollLerp - prevScrollLerp) > 0.0001) needsRender = true

      // Logo orbit + rotation always need a frame
      needsRender = true

      if (!needsRender) return
      needsRender = false

      lerpWaypoints(waypoints, scrollLerp, targetPos, targetLook)
      currentPos.lerp(targetPos, quality.lerpFactor)
      currentLook.lerp(targetLook, quality.lerpFactor)

      const swayX = quality.isMobile ? mouseX * 0.1 : mouseX * 0.3
      const swayY = quality.isMobile ? mouseY * 0.05 : mouseY * 0.15
      camera.position.set(
        THREE.MathUtils.clamp(currentPos.x + swayX, -2, 2),
        currentPos.y + swayY,
        currentPos.z
      )
      camera.lookAt(currentLook.x + swayX * 0.5, currentLook.y + swayY * 0.5, currentLook.z)

      const t = now * 0.001
      const orbitSpeed = 0.5
      const orbitRadius = logoAnim.orbitRadius
      logoAnim.dot.position.set(
        Math.sin(t * orbitSpeed) * orbitRadius,
        Math.cos(t * orbitSpeed) * orbitRadius,
        0.01
      )
      logoAnim.innerDot.position.set(
        Math.sin(t * orbitSpeed) * orbitRadius,
        Math.cos(t * orbitSpeed) * orbitRadius,
        0.02
      )

      galleryCube.rotation.y += 0.012
      galleryCube.rotation.x += 0.006
      galleryCube.position.y = cubeBaseY + Math.sin(t * 1.2) * 0.06

      raycaster.setFromCamera(pointer, camera)
      const intersects = raycaster.intersectObject(galleryCube)

      if (intersects.length > 0) {
        if (!isHoveringCube) {
          isHoveringCube = true
          cubeMat.color.set(0xc94420)
          if (!quality.isMobile) {
            document.body.style.cursor = 'pointer'
            if (cur) {
              cur.style.width = '44px'
              cur.style.height = '44px'
              cur.style.background = 'rgba(232,82,42,.15)'
              cur.style.borderColor = '#E8522A'
            }
          }
        }
      } else if (isHoveringCube) {
        isHoveringCube = false
        cubeMat.color.set(0xe8522a)
        if (!quality.isMobile) {
          document.body.style.cursor = 'none'
          if (cur) {
            cur.style.width = '10px'
            cur.style.height = '10px'
            cur.style.background = 'transparent'
            cur.style.borderColor = 'rgba(232,82,42,.9)'
          }
        }
      }

      renderer.render(scene, camera)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click', onClick)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    if (quality.isMobile) {
      window.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: false })
      window.addEventListener('touchend', onTouchEnd, { passive: true })
    }
    onScroll()
    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      document.body.style.cursor = ''
      if (cur) {
        cur.style.width = ''
        cur.style.height = ''
        cur.style.background = ''
        cur.style.borderColor = ''
      }
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onClick)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      renderer.dispose()
      disposables.forEach(d => {
        d.geo?.dispose()
        if (Array.isArray(d.mat)) d.mat.forEach(m => m.dispose())
        else if (d.mat && d.mat !== MAT.wall && d.mat !== MAT.floor && d.mat !== MAT.ceiling &&
          d.mat !== MAT.concrete && d.mat !== MAT.accent && d.mat !== MAT.dark &&
          d.mat !== MAT.green && d.mat !== MAT.darkScreen && d.mat !== MAT.glass &&
          d.mat !== MAT.white) {
          d.mat.dispose()
        }
      })
      scene.traverse(obj => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose()
        }
      })
    }
  }, [])

  return (
    <div style={{ minHeight: isMobile ? '500vh' : '600vh', background: '#F0EBE0' }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 1 }}
      />

      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to bottom, rgba(26,20,16,0.4), transparent)', zIndex: 50, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, rgba(26,20,16,0.4), transparent)', zIndex: 50, pointerEvents: 'none' }} />

      <div style={{ position: 'fixed', inset: 0, zIndex: 100, pointerEvents: 'none', fontFamily: "'JetBrains Mono', monospace" }}>
        <div style={{ position: 'absolute', top: isMobile ? 16 : 24, left: isMobile ? 16 : 24, display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 12, pointerEvents: 'auto' }}>
          <svg width={isMobile ? 26 : 32} height={isMobile ? 26 : 32} viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="46" fill="#1A1410"/>
            <circle cx="48" cy="48" r="28" fill="#F5F0E8"/>
            <rect x="48" y="2" width="48" height="46" fill="#F5F0E8"/>
            <rect x="48" y="48" width="48" height="46" fill="#F5F0E8"/>
            <circle cx="48" cy="20" r="9" fill="#E8522A"/>
            <circle cx="48" cy="20" r="4" fill="#1A1410"/>
          </svg>
          {!isMobile && (
            <span style={{ fontSize: 10, letterSpacing: '.2em', color: 'rgba(245,240,232,.7)', fontWeight: 700 }}>CO-STUDIO</span>
          )}
        </div>

        <div style={{
          position: 'absolute', top: isMobile ? 52 : 68, left: isMobile ? 16 : 24,
          opacity: showBack ? 1 : 0, transition: 'opacity .6s ease',
          pointerEvents: 'auto',
        }}>
          <Link
            to="/"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9, letterSpacing: '.15em',
              color: 'rgba(245,240,232,.3)',
              textDecoration: 'none', textTransform: 'uppercase',
              border: '1px solid rgba(245,240,232,.15)',
              borderRadius: 999, padding: '6px 14px',
              transition: 'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#E8522A'; e.currentTarget.style.borderColor = '#E8522A' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,240,232,.3)'; e.currentTarget.style.borderColor = 'rgba(245,240,232,.15)' }}
          >
            ← BACK
          </Link>
        </div>

        <div style={{ position: 'absolute', top: isMobile ? 20 : 28, right: isMobile ? 16 : 24, fontSize: isMobile ? 8 : 9, letterSpacing: '.2em', color: '#E8522A', textTransform: 'uppercase' }}>
          {ROOM_NAMES[roomIndex]}
        </div>

        <div style={{
          position: 'absolute',
          bottom: isMobile ? 16 : 28,
          left: isMobile ? 16 : 24,
          fontSize: 8,
          letterSpacing: '.2em',
          color: 'rgba(245,240,232,.35)',
          textTransform: 'uppercase',
        }}>
          {isMobile ? 'SWIPE TO WALK ——' : 'SCROLL TO WALK THROUGH ——'}
        </div>

        <div style={{ position: 'absolute', bottom: isMobile ? 16 : 28, right: isMobile ? 16 : 24, display: 'flex', gap: isMobile ? 5 : 8, alignItems: 'center' }}>
          {ROOM_NAMES.map((_, i) => (
            <div
              key={i}
              style={{
                width: roomIndex === i ? 24 : 6,
                height: 6,
                borderRadius: 999,
                background: roomIndex === i ? '#E8522A' : 'rgba(245,240,232,.25)',
                transition: 'all .3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {isMobile && isPortrait && !isNearGallery && (
        <div style={{
          position: 'fixed', bottom: 56, left: '50%', transform: 'translateX(-50%)',
          zIndex: 110, fontFamily: "'JetBrains Mono', monospace",
          fontSize: 8, letterSpacing: '.15em', color: 'rgba(245,240,232,.5)',
          textTransform: 'uppercase', textAlign: 'center',
          background: 'rgba(26,20,16,.6)', padding: '8px 16px', borderRadius: 999,
          pointerEvents: 'none',
        }}>
          ROTATE PHONE FOR BEST EXPERIENCE
        </div>
      )}

      <AnimatePresence>
        {isNearGallery && (
          <motion.div
            key="cube-hint"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              bottom: isMobile ? 56 : 80,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: isMobile ? 8 : 9,
              letterSpacing: '.2em',
              color: 'rgba(232,82,42,.8)',
              textTransform: 'uppercase',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? 6 : 8,
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ width: isMobile ? 12 : 20, height: 1, background: '#E8522A', display: 'inline-block' }} />
            {isMobile ? 'TAP THE CUBE' : 'CLICK THE CUBE'}
            <span style={{ width: isMobile ? 12 : 20, height: 1, background: '#E8522A', display: 'inline-block' }} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {projectsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(26,20,16,.85)',
              backdropFilter: 'blur(16px)',
              display: 'flex', flexDirection: 'column',
              padding: isMobile ? '20px 16px 24px' : '40px',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'center',
                gap: isMobile ? 16 : 0,
                marginBottom: isMobile ? 24 : 40,
              }}
            >
              <div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9, letterSpacing: '.25em',
                  color: '#E8522A', marginBottom: 8,
                  textTransform: 'uppercase',
                }}>
                  [02] — Galerie
                </div>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 'clamp(48px, 8vw, 80px)',
                  fontWeight: 900, color: '#F5F0E8',
                  letterSpacing: -2, lineHeight: 0.9,
                }}>
                  PROJEKTE.
                </div>
              </div>
              <button
                onClick={() => setProjectsOpen(false)}
                style={{
                  background: 'rgba(245,240,232,.08)',
                  border: '1.5px solid rgba(245,240,232,.15)',
                  borderRadius: 999, padding: '10px 20px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9, letterSpacing: '.15em',
                  color: 'rgba(245,240,232,.5)',
                  cursor: 'pointer', transition: 'all .2s',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#E8522A'
                  e.currentTarget.style.color = '#E8522A'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(245,240,232,.15)'
                  e.currentTarget.style.color = 'rgba(245,240,232,.5)'
                }}
              >
                ✕ CLOSE
              </button>
            </motion.div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: isMobile ? 12 : 16,
            }}>
              {PROJECTS_OVERLAY.map((proj, i) => (
                <motion.div
                  key={proj.num}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  style={{
                    background: proj.color,
                    borderRadius: isMobile ? 12 : 16,
                    padding: isMobile ? 20 : 28,
                    display: 'flex', flexDirection: 'column', gap: 12,
                    border: '1px solid rgba(245,240,232,.06)',
                    cursor: 'default',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9, letterSpacing: '.2em',
                      color: '#E8522A',
                    }}>[{proj.num}]</span>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 8, letterSpacing: '.12em',
                      color: proj.color === '#F8F5F0' ? 'rgba(26,20,16,.4)' : 'rgba(245,240,232,.3)',
                      textTransform: 'uppercase',
                    }}>{proj.type}</span>
                  </div>

                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: isMobile ? 28 : 36, fontWeight: 900,
                    color: proj.textColor,
                    letterSpacing: -0.5, lineHeight: 1,
                  }}>{proj.name}</div>

                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10, lineHeight: 1.7,
                    color: proj.color === '#F8F5F0' ? 'rgba(26,20,16,.5)' : 'rgba(245,240,232,.5)',
                    flex: 1,
                  }}>{proj.desc}</p>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {proj.tags.map(tag => (
                      <span key={tag} style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 8, letterSpacing: '.1em',
                        border: '1px solid rgba(232,82,42,.3)',
                        borderRadius: 999, padding: '3px 10px',
                        color: '#E8522A', textTransform: 'uppercase',
                      }}>{tag}</span>
                    ))}
                  </div>

                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', paddingTop: 8,
                    borderTop: '1px solid rgba(245,240,232,.06)',
                  }}>
                    <span style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 18, fontWeight: 700,
                      color: proj.color === '#F8F5F0' ? 'rgba(26,20,16,.2)' : 'rgba(245,240,232,.2)',
                      letterSpacing: -0.5,
                    }}>{proj.year}</span>

                    {proj.hasDemo && (
                      <button
                        onClick={() => {
                          setProjectsOpen(false)
                          window.location.href = '/#work'
                        }}
                        style={{
                          background: 'transparent',
                          border: '1.5px solid #E8522A',
                          borderRadius: 999, padding: '7px 16px',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 8, letterSpacing: '.12em',
                          color: '#E8522A', cursor: 'pointer',
                          textTransform: 'uppercase',
                          transition: 'all .2s',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = '#E8522A'
                          e.currentTarget.style.color = 'white'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.color = '#E8522A'
                        }}
                      >
                        ▶ DEMO →
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                marginTop: isMobile ? 24 : 40, paddingTop: isMobile ? 16 : 24,
                borderTop: '1px solid rgba(245,240,232,.06)',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'stretch' : 'center',
                flexWrap: 'wrap', gap: 16,
              }}
            >
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, color: 'rgba(245,240,232,.2)',
                letterSpacing: '.1em',
              }}>
                5 PROJEKTE · 2024–2026
              </span>
              <button
                onClick={() => {
                  setProjectsOpen(false)
                  window.location.href = '/'
                }}
                style={{
                  background: '#E8522A', color: 'white',
                  border: 'none', borderRadius: 999,
                  padding: '10px 24px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9, letterSpacing: '.12em',
                  cursor: 'pointer', textTransform: 'uppercase',
                  transition: 'background .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#c94420' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#E8522A' }}
              >
                ZURÜCK ZUR HAUPTSEITE →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <span className="sr-only" aria-live="polite">
        Room {roomIndex + 1} of 5 — {Math.round(scrollProgress * 100)}%
      </span>
    </div>
  )
}
