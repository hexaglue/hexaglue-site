// @ts-check

import mdx from '@astrojs/mdx';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import compress from '@playform/compress';
import { defineConfig } from 'astro/config';
import astroExpressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import houston from './houston.theme.json';

// https://astro.build/config
export default defineConfig({
	site: 'https://hexaglue.io',
	prefetch: true,
	redirects: {
		'/getting-started/': '/docs/getting-started/',
	},
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		astroExpressiveCode({
			themes: [houston],
			styleOverrides: {
				borderRadius: '0.375rem',
				borderColor: 'rgb(84 88 100)',
				// Style moderne avec effet halo pour les lignes marquées
				textMarkers: {
					// Effet halo : dégradé lumineux de gauche à droite qui attire le regard
					markBackground: 'linear-gradient(90deg, rgba(56, 189, 248, 0.25) 0%, rgba(56, 189, 248, 0.12) 20%, rgba(56, 189, 248, 0.03) 60%, transparent 100%)',
					// Bordure gauche lumineuse (cyan/sky)
					markBorderColor: 'rgb(56, 189, 248)',
				},
			},
			defaultProps: {
				overridesByLang: {
					'bash,sh,shell': {
						frame: 'none',
					},
				},
			},
		}),
		icon({
			svgoOptions: {
				plugins: [
					{ name: 'preset-default' },
					{
						name: 'prefixIds',
						// Ensure IDs used in SVGs are unique to avoid clashes between inline SVGs.
						params: { prefix: () => Math.round(Math.random() * 1_000_000_000).toString(36) },
					},
				],
			},
		}),
		mdx(),
		sitemap({
			serialize(item) {
				const url = item.url;

				// Homepage - priorité maximale
				if (url === 'https://hexaglue.io/') {
					item.priority = 1.0;
					item.changefreq = ChangeFreqEnum.WEEKLY;
				}
				// Documentation section
				else if (url.includes('/docs/')) {
					item.priority = 0.85;
					item.changefreq = ChangeFreqEnum.WEEKLY;
				}
				// Features section
				else if (url.includes('/features/')) {
					item.priority = 0.80;
					item.changefreq = ChangeFreqEnum.WEEKLY;
				}
				// Personas section
				else if (url.includes('/for/')) {
					item.priority = 0.70;
					item.changefreq = ChangeFreqEnum.WEEKLY;
				}
				// Guides section - high priority for SEO evergreen content
				else if (url.includes('/guides/')) {
					item.priority = 0.90;
					item.changefreq = ChangeFreqEnum.MONTHLY;
				}
				// Services
				else if (url.includes('/services')) {
					item.priority = 0.8;
					item.changefreq = ChangeFreqEnum.WEEKLY;
				}
				// Case Studies
				else if (url.includes('/case-studies')) {
					item.priority = 0.7;
					item.changefreq = ChangeFreqEnum.WEEKLY;
				}
				// Contact - rarement mis à jour
				else if (url.includes('/contact')) {
					item.priority = 0.8;
					item.changefreq = ChangeFreqEnum.WEEKLY;
				}
				// Autres pages
				else {
					item.priority = 0.6;
					item.changefreq = ChangeFreqEnum.WEEKLY;
				}

				// Date de dernière modification
				item.lastmod = new Date().toISOString().split('T')[0];

				return item;
			},
		}),
		// Compress doit rester en dernier : il post-traite le build final.
		// CSS/JS déjà minifiés par Vite, images par astro:assets, SVG par astro-icon.
		compress({
			CSS: false,
			HTML: true,
			Image: false,
			JavaScript: false,
			SVG: false,
			Logger: 1,
		}),
	],
	image: {
		domains: [],
	},
	vite: {
		ssr: {
			noExternal: [],
		},
	},
	experimental: {
		contentIntellisense: true,
	},
});
