import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  url?: string
  image?: string
}

const BASE_URL = 'https://www.co-studio.at'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`

export default function SEO({
  title = 'co-studio — Web & App Entwicklung Wien | Corneliu Secrieri',
  description = 'co-studio ist eine Web- und App-Entwicklung aus Wien. React, Swift, Tauri, WordPress — moderne digitale Produkte von Corneliu Secrieri.',
  url = BASE_URL,
  image = DEFAULT_IMAGE,
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
