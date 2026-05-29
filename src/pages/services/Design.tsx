import ServiceDetailPage from '../../components/ServiceDetailPage'

export default function ServiceDesign() {
  return (
    <ServiceDetailPage
      slug="design"
      num="03 / 04"
      titleKey="services.design.title"
      techStack={['Figma', 'Photoshop', 'Illustrator', 'After Effects', 'InDesign']}
      accentTech={['Figma']}
    />
  )
}
