import vsMannersdorfImg from '../assets/vs-mannersord/web-vs.png'
import coBibleImg from '../assets/co.bible/co.bible-mockup.png'
import bibelsucheImg from '../assets/bibelsuche/biblesrc.png'

export type ProjectMeta = {
  slug: string
  year: number
  platform: string
  tags: string[]
  github?: string
  live?: string
  image?: string
}

export const PROJECTS_META: ProjectMeta[] = [
  {
    slug: 'medicare',
    year: 2026,
    platform: 'iOS · Android',
    tags: ['React Native', 'Expo', 'TypeScript'],
  },
  {
    slug: 'cobible',
    year: 2026,
    platform: 'iOS',
    tags: ['Swift', 'SwiftUI', 'Xcode'],
    image: coBibleImg,
  },
  {
    slug: 'bibelsuche',
    year: 2026,
    platform: 'macOS · Windows',
    tags: ['React', 'Vite', 'Tauri', 'Rust', 'TypeScript', 'CSS'],
    github: 'https://github.com/coocoolinoo/bibelsuche',
    image: bibelsucheImg,
  },
  {
    slug: 'vsmannersdorf',
    year: 2025,
    platform: 'Web',
    tags: ['React', 'Vite', 'CSS Modules', 'React Router'],
    github: 'https://github.com/co-studio-code/vs-mannersdorf',
    live: 'https://vs-mannersdorf.vercel.app',
    image: vsMannersdorfImg,
  },
]
