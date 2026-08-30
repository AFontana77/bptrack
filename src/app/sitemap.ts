import type { MetadataRoute } from 'next';

const BASE = 'https://bptrack.app';
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/library`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/checklist`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/support`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    // SEO content pages
    { url: `${BASE}/blood-pressure-chart`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/how-to-read-blood-pressure`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/log-sheet`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/free-blood-pressure-log-pdf`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/prehypertension`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/aha-blood-pressure-log`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    // Resource hub + commercial-intent spokes (M0.3.2)
    { url: `${BASE}/resources`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/validated-blood-pressure-monitors`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/blood-pressure-cuff-size`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // Tools + app-intent authority (M2)
    { url: `${BASE}/blood-pressure-average-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/blood-pressure-apps`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/tracking-starter-kit`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ];
}
