import ServiceDetailPage from '../../components/ServiceDetailPage'

export default function ServiceApp() {
  return (
    <ServiceDetailPage
      slug="app"
      num="02 / 04"
      titleKey="services.app.title"
      techStack={['Swift', 'SwiftUI', 'Expo', 'React Native', 'Ionic', 'Java', 'Tauri', 'Rust', 'TypeScript']}
      accentTech={['Swift', 'Expo', 'React Native']}
    />
  )
}
