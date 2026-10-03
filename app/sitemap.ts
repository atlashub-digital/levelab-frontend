import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

const LOCALES = ['pt-br', 'pt-pt', 'en', 'es'] as const;

const ROUTES: { path: string; priority: number; changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/sobre', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/lia', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/avaliacao', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/programas', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/programas/corpo-forte', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/programas/corpo-forte/reader', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/programas/forca-na-caneta', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/programas/forca-na-caneta/reader', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/conteudos', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/loja', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/contato', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/legal/privacidade', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/legal/termos', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/legal/cookies', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/legal/saude', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/legal/ia', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/acessibilidade', priority: 0.5, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: `${siteConfig.url}/${locale}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  );
}
