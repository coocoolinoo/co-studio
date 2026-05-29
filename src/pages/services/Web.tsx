import ServiceDetailPage from '../../components/ServiceDetailPage'

export default function ServiceWeb() {
  return (
    <ServiceDetailPage
      num="01 / 04"
      title="Web & WordPress"
      tagline="From landing pages and CMS builds to full-stack React apps — built clean, built fast, built to last."
      desc="Whether you need a high-performance React app, a flexible WordPress site, or a custom backend — I cover the full stack. Every project is designed with maintainability in mind: clean code, documented structure, and sensible architecture. No bloat, no overcomplicated setups."
      deliverables={[
        'Custom React & Angular applications',
        'WordPress builds & CMS integration',
        'REST API design & integration',
        'Database design (SQL, MySQL, PostgreSQL)',
        'Docker containerisation & deployment',
        'Performance optimisation & SEO',
        'Landing pages & marketing sites',
      ]}
      techStack={['React', 'Angular', 'WordPress', 'TypeScript', 'Vite', 'Node.js', 'SQL', 'Docker', 'Python', 'PHP']}
      accentTech={['React', 'WordPress', 'TypeScript']}
      process={[
        { num: '01', title: 'Discovery', desc: 'Goals, tech requirements, scope — mapped out before a single line of code.' },
        { num: '02', title: 'Design', desc: 'Wireframes and UI concepts in Figma, agreed before development starts.' },
        { num: '03', title: 'Build', desc: 'Clean, component-driven development with regular check-ins.' },
        { num: '04', title: 'Deploy', desc: 'Live deployment, testing, handover documentation.' },
      ]}
    />
  )
}
