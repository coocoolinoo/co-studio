import ServiceDetailPage from '../../components/ServiceDetailPage'

export default function ServiceWeb() {
  return (
    <ServiceDetailPage
      slug="web"
      num="01 / 04"
      titleKey="services.web.title"
      techStack={['React', 'Angular', 'WordPress', 'TypeScript', 'Vite', 'Node.js', 'SQL', 'Docker', 'Python', 'PHP']}
      accentTech={['React', 'WordPress', 'TypeScript']}
    />
  )
}
