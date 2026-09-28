// JSON-LD builders. Base.astro always emits `organization`; pages add their own nodes.
import { ABOUT, BLOG, CONTACT, DATASHEET, HOME, ROUTES, SEO, SITE, SOLUTION } from '../content/site';

const abs = (path: string) => new URL(path, SITE.url).href;
const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;
const orgRef = { '@id': ORG_ID };

export const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  url: abs('/'),
  logo: abs('/bastet-logo.png'),
  image: abs('/og-image.png'),
  slogan: SITE.tagline,
  description: SEO.home.description,
  email: SITE.email,
  sameAs: [SITE.linkedin, SITE.facebook],
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', email: SITE.email, availableLanguage: ['en'] }],
};

const webPage = (page: keyof typeof ROUTES, type = 'WebPage') => ({
  '@type': type,
  '@id': `${abs(ROUTES[page])}#webpage`,
  url: abs(ROUTES[page]),
  name: SEO[page].title,
  description: SEO[page].description,
  isPartOf: { '@id': SITE_ID },
  publisher: orgRef,
  inLanguage: 'en',
});

export const homeSchema = [
  {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: abs('/'),
    name: SITE.name,
    description: SEO.home.description,
    publisher: orgRef,
    inLanguage: 'en',
    // The site has no internal search; the action scopes a web search to the domain.
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://www.google.com/search?q=site%3Abastet-tech.ai+{search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  },
  webPage('home'),
  {
    '@type': 'FAQPage',
    '@id': `${abs('/')}#faq`,
    mainEntity: HOME.faq.items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
];

export const solutionSchema = [
  webPage('solution'),
  {
    '@type': 'Product',
    '@id': `${abs('/solution')}#product`,
    name: 'Bastet AI Pest Control Platform',
    description: SEO.solution.description,
    brand: { '@type': 'Brand', name: SITE.name },
    manufacturer: orgRef,
    category: 'Pest control monitoring system',
    image: abs('/og-image.png'),
    url: abs('/solution'),
    isRelatedTo: HOME.solutions.items.map((s) => ({ '@type': 'Product', name: s.title, description: s.body })),
    additionalProperty: SOLUTION.tech.items.map((t) => ({ '@type': 'PropertyValue', name: t.title, value: t.body })),
  },
];

export const datasheetSchema = [
  {
    ...webPage('datasheet', 'CollectionPage'),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: DATASHEET.products.length,
      itemListElement: DATASHEET.products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'DigitalDocument',
          name: `${p.name} datasheet`,
          about: { '@type': 'Product', name: p.name, category: p.category, description: p.description, brand: { '@type': 'Brand', name: SITE.name } },
          encodingFormat: 'application/pdf',
          url: abs(`/datasheets/${p.file}`),
        },
      })),
    },
  },
];

export const aboutSchema = [{ ...webPage('about', 'AboutPage'), about: orgRef, mainEntity: orgRef, text: ABOUT.mission.body }];

export const contactSchema = [
  {
    ...webPage('contact', 'ContactPage'),
    about: orgRef,
    mainEntity: { ...orgRef, email: CONTACT.email.address },
  },
];

export const privacySchema = [webPage('privacy')];

export const blogSchema = [
  webPage('blog'),
  {
    '@type': 'Blog',
    '@id': `${SITE.blog}/#blog`,
    name: BLOG.title,
    description: BLOG.sub,
    url: SITE.blog,
    publisher: orgRef,
    inLanguage: 'en',
  },
];
