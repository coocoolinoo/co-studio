import ServiceDetailPage from '../../components/ServiceDetailPage'

export default function ServiceVideo() {
  return (
    <ServiceDetailPage
      num="04 / 04"
      title="Video & VFX"
      tagline="Cuts, motion, and effects — for content that needs to hit harder."
      desc="Video that moves. Whether it's a fast-cut promo, a motion graphics piece, or a full VFX sequence — I bring technical precision and a strong visual sense. Edited for the platform it's meant to live on, mixed properly, and delivered on time."
      deliverables={[
        'Video editing & post-production',
        'Motion graphics & animated titles',
        'Visual effects (compositing, tracking)',
        'Colour grading & correction',
        'Social media cuts (Reels, Shorts, TikTok)',
        'Sound design & audio mixing',
        'Export in all required formats & resolutions',
      ]}
      techStack={['After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Photoshop']}
      accentTech={['After Effects', 'Premiere Pro']}
      process={[
        { num: '01', title: 'Brief', desc: 'Platform, tone, length, references — everything that shapes the cut.' },
        { num: '02', title: 'Cut', desc: 'Rough edit delivered for feedback before VFX and colour.' },
        { num: '03', title: 'Effects', desc: 'Motion graphics, VFX, and colour grading applied.' },
        { num: '04', title: 'Export', desc: 'Final delivery in all required formats with project archive.' },
      ]}
    />
  )
}
