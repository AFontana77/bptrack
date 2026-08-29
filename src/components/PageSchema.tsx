import { PRODUCT, AHA_SOURCE } from '@/lib/product';

/**
 * Article + BreadcrumbList, and FAQPage only when the page really shows one.
 *
 * Twelve of the sixteen pages here shipped with no structured data at all,
 * including /blood-pressure-chart, which targets the highest volume term the
 * site has any claim to. This is the one place that gets fixed, so the shape
 * cannot drift page to page.
 *
 * FAQPage is opt in and takes the SAME array the page renders. Passing a
 * hand-written second copy would be how you end up with schema describing
 * questions no reader can see, which is a manual action waiting to happen.
 */
export function PageSchema({
  path,
  headline,
  published,
  modified,
  breadcrumb,
  faqs,
  citeAha = false,
}: {
  path: string;
  headline: string;
  published: string;
  modified?: string;
  /** Crumbs between Home and this page. Home and self are added for you. */
  breadcrumb?: { name: string; path: string }[];
  /** Only pass the array the page actually renders. */
  faqs?: readonly { q: string; a: string }[];
  citeAha?: boolean;
}) {
  const url = `${PRODUCT.siteUrl}${path}`;
  const crumbs = [
    { name: 'Home', item: PRODUCT.siteUrl },
    ...(breadcrumb || []).map((b) => ({ name: b.name, item: `${PRODUCT.siteUrl}${b.path}` })),
    { name: headline, item: url },
  ];

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline,
      datePublished: published,
      dateModified: modified || published,
      author: { '@type': 'Organization', name: PRODUCT.publisher },
      publisher: { '@id': `${PRODUCT.siteUrl}/#organization` },
      isPartOf: { '@id': `${PRODUCT.siteUrl}/#website` },
      mainEntityOfPage: url,
      ...(citeAha
        ? { citation: [{ '@type': 'WebPage', name: AHA_SOURCE.title, url: AHA_SOURCE.url }] }
        : {}),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: c.item,
      })),
    },
  ];

  if (faqs && faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
      }}
    />
  );
}
