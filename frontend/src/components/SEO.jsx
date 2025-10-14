import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'Miracle - Full Stack Developer Portfolio',
  description = 'Full Stack Developer specializing in React, Node.js, and modern web technologies. View my projects and get in touch.',
  keywords = 'web developer, full stack, react, node.js, portfolio',
  image = '/og-image.jpg',
  url = window.location.href,
  type = 'website',
}) => {
  const siteTitle = 'Miracle Portfolio';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Miracle" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
