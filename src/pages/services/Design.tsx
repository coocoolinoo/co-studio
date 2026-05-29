import ServiceDetailPage from '../../components/ServiceDetailPage'

export default function ServiceDesign() {
  return (
    <ServiceDetailPage
      num="03 / 04"
      title="Graphic & UI Design"
      tagline="Logos, interfaces, and print — everything designed to ship. Modern minimalism, sometimes deliberately complex."
      desc="Design that doesn't just look good but works. From a brand identity that holds up across every touchpoint, to a UI system a developer can actually build from — I design with purpose. Clean grids, strong type, intentional colour."
      deliverables={[
        'Logo design & brand identity',
        'UI/UX design & design systems',
        'Figma files with component libraries',
        'Print design (flyers, posters, brochures)',
        'Social media assets & templates',
        'Icon sets & illustration',
        'Style guides & brand guidelines',
      ]}
      techStack={['Figma', 'Photoshop', 'Illustrator', 'After Effects', 'InDesign']}
      accentTech={['Figma']}
      process={[
        { num: '01', title: 'Brief', desc: 'Understanding the brand, audience, and visual goals.' },
        { num: '02', title: 'Concept', desc: 'Moodboards, sketches, and direction — agreed before full execution.' },
        { num: '03', title: 'Design', desc: 'Full execution in Figma with revisions included.' },
        { num: '04', title: 'Deliver', desc: 'Export-ready files in all required formats plus style guide.' },
      ]}
    />
  )
}
