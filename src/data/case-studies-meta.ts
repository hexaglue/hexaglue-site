export interface CaseStudyPage {
	slug: string;
	title: string;
}

export interface CaseStudyMeta {
	slug: string;
	name: string;
	description: string;
	repoUrl: string;
	pages: CaseStudyPage[];
	about: Array<{ "@type": string; name: string }>;
	proficiencyLevel: string;
}

export const caseStudies: CaseStudyMeta[] = [
	{
		slug: 'ecommerce-migration',
		name: 'Migration E-Commerce',
		description:
			"Migration d'une application e-commerce Spring Boot vers une architecture hexagonale avec HexaGlue. Du monolithe (13/100) au code généré (64/100).",
		repoUrl: 'https://github.com/hexaglue/case-study-ecommerce',
		pages: [
			{ slug: '', title: 'Diagnostic' },
			{ slug: 'migration', title: 'Migration' },
			{ slug: 'result', title: 'Résultat' },
		],
		about: [
			{ "@type": "Thing", name: "Architecture hexagonale" },
			{ "@type": "Thing", name: "Domain-Driven Design" },
			{ "@type": "Thing", name: "Java" },
		],
		proficiencyLevel: "Expert",
	},
	{
		slug: 'banking-migration',
		name: 'Migration Bancaire Multi-Modules',
		description:
			"Migration d'une application bancaire Spring Boot multi-modules vers une architecture hexagonale avec HexaGlue. Du monolithe (14/100) au code généré (67/100).",
		repoUrl: 'https://github.com/hexaglue/case-study-banking',
		pages: [
			{ slug: '', title: 'Diagnostic' },
			{ slug: 'migration', title: 'Migration' },
			{ slug: 'result', title: 'Résultat' },
		],
		about: [
			{ "@type": "Thing", name: "Architecture hexagonale" },
			{ "@type": "Thing", name: "Domain-Driven Design" },
			{ "@type": "Thing", name: "Java" },
			{ "@type": "Thing", name: "Multi-Module Maven" },
		],
		proficiencyLevel: "Expert",
	},
];

export function findCaseStudy(pathname: string): CaseStudyMeta | undefined {
	return caseStudies.find((cs) => pathname.includes(`/${cs.slug}/`));
}
