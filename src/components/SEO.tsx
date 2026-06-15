import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

interface SEOProps {
  titleKey?: string
  descriptionKey?: string
  title?: string
  description?: string
  url?: string
  image?: string
}

const BASE_URL = 'https://www.co-studio.at'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`

export default function SEO({
  titleKey,
  descriptionKey,
  title,
  description,
  url = BASE_URL,
  image = DEFAULT_IMAGE,
}: SEOProps) {
  const { t } = useTranslation()
  const resolvedTitle = title ?? t(titleKey ?? 'seo.defaultTitle')
  const resolvedDescription = description ?? t(descriptionKey ?? 'seo.defaultDescription')

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
