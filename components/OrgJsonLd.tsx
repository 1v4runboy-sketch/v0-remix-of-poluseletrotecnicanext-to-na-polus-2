export default function OrgJsonLd() {
  const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.poluseletrotecnica.com.br';
  const data = {
    '@context':'https://schema.org',
    '@type':'Organization',
    name:'Polus Eletrotécnica',
    url: BASE,
    logo: `${BASE}/polus-logo.svg`,
    sameAs: ['https://www.instagram.com/_poluseletrotecnica/']
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
