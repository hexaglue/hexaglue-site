export type SchemaType = 'WebPage' | 'ContactPage' | 'CollectionPage' | 'TechArticle';

export interface Breadcrumb {
	name: string;
	url: string;
}

export const SEGMENT_LABELS: Record<string, string> = {
	'getting-started': 'Démarrage rapide',
	'services': 'Services',
	'contact': 'Contact',
	'case-studies': 'Études de cas',
	'ecommerce-migration': 'Migration E-Commerce',
	'banking-migration': 'Migration Bancaire',
	'features': 'Fonctionnalités',
	'classification': 'Classification',
	'audit': 'Audit',
	'jpa-generation': 'Génération JPA',
	'living-documentation': 'Living Documentation',
	'for': 'Pour qui',
	'decision-makers': 'Décideurs',
	'architects': 'Architectes',
	'tech-leads': 'Tech Leads',
	'docs': 'Documentation',
	'plugin-audit': 'Plugin Audit',
	'plugin-jpa': 'Plugin JPA',
	'plugin-living-doc': 'Plugin Living Doc',
	'guides': 'Guides',
	'ddd-principles': 'Principes DDD',
	'hexagonal-architecture': 'Architecture Hexagonale',
	'2.0.0': 'v2.0.0',
};

export function inferSchemaType(pathname: string): SchemaType | undefined {
	if (pathname === '/') return undefined;
	if (pathname === '/contact/') return 'ContactPage';
	if (pathname.includes('/step-')) return 'TechArticle';
	if (pathname.match(/\/docs\/plugin-/)) return 'TechArticle';
	if (pathname.match(/\/features\/[\w-]+\//)) return 'TechArticle';
	if (pathname.match(/\/guides\/[\w-]+\//)) return 'TechArticle';
	if (pathname.match(/\/case-studies\/([\w-]+\/)?$/)) return 'CollectionPage';
	if (pathname.match(/\/(features|docs|guides)\/$/)) return 'CollectionPage';
	return 'WebPage';
}

export function buildBreadcrumbs(pathname: string, lastLabel: string, baseUrl: string): Breadcrumb[] {
	const segments = pathname.split('/').filter(Boolean);
	if (segments.length === 0) return [];

	const crumbs: Breadcrumb[] = [{ name: 'Accueil', url: `${baseUrl}/` }];
	let currentPath = '';

	for (let i = 0; i < segments.length; i++) {
		const seg = segments[i];
		currentPath += `/${seg}`;
		const isLast = i === segments.length - 1;
		const label = isLast ? lastLabel.split(' | ')[0] : (SEGMENT_LABELS[seg] ?? seg);
		crumbs.push({ name: label, url: `${baseUrl}${currentPath}/` });
	}
	return crumbs;
}
