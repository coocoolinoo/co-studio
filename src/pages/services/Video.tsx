import ServiceDetailPage from '../../components/ServiceDetailPage'

export default function ServiceVideo() {
  return (
    <ServiceDetailPage
      slug="video"
      num="04 / 04"
      titleKey="services.media.title"
      techStack={['After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Photoshop']}
      accentTech={['After Effects', 'Premiere Pro']}
    />
  )
}
