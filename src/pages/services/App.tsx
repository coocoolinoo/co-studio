import ServiceDetailPage from '../../components/ServiceDetailPage'

export default function ServiceApp() {
  return (
    <ServiceDetailPage
      num="02 / 04"
      title="App Development"
      tagline="Native and cross-platform mobile apps — from concept to App Store. Built to feel right on any screen."
      desc="Mobile apps that don't feel like mobile apps. Whether it's a native Swift experience for iOS or a cross-platform build with Expo and React Native — the focus is always on performance, feel, and clean UI. I handle the full lifecycle: concept, design, build, and release."
      deliverables={[
        'Native iOS apps (Swift & SwiftUI)',
        'Cross-platform apps (Expo / React Native)',
        'Android apps (Ionic / Java)',
        'Desktop apps (Tauri + Rust)',
        'App Store & Google Play submission',
        'Push notifications & background services',
        'API integration & local data storage',
      ]}
      techStack={['Swift', 'SwiftUI', 'Expo', 'React Native', 'Ionic', 'Java', 'Tauri', 'Rust', 'TypeScript']}
      accentTech={['Swift', 'Expo', 'React Native']}
      process={[
        { num: '01', title: 'Concept', desc: 'Feature scope, platform decisions, user flow — defined before design.' },
        { num: '02', title: 'Prototype', desc: 'Interactive prototype to validate UX before full build.' },
        { num: '03', title: 'Build', desc: 'Iterative development with milestone reviews and beta testing.' },
        { num: '04', title: 'Release', desc: 'App Store / Play Store submission, monitoring, and post-launch support.' },
      ]}
    />
  )
}
