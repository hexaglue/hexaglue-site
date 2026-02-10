import {
	steps as ecommerceSteps,
	type MigrationStep,
} from '~/pages/case-studies/ecommerce-migration/_data/steps';
import { steps as bankingSteps } from '~/pages/case-studies/banking-migration/_data/steps';

export type { MigrationStep };

export interface CaseStudyMeta {
	slug: string;
	name: string;
	description: string;
	repoUrl: string;
	steps: MigrationStep[];
	about: Array<{ "@type": string; name: string }>;
	proficiencyLevel: string;
}

export const caseStudies: CaseStudyMeta[] = [
	{
		slug: 'ecommerce-migration',
		name: 'Migration E-Commerce',
		description:
			"Migration d'une application e-commerce Spring Boot vers une architecture hexagonale avec HexaGlue. 7 étapes, de 13/100 à 63/100.",
		repoUrl: 'https://github.com/hexaglue/case-study-ecommerce',
		steps: ecommerceSteps,
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
			"Migration d'une application bancaire Spring Boot multi-modules vers une architecture hexagonale avec HexaGlue. 7 étapes, de 14/100 à 66/100.",
		repoUrl: 'https://github.com/hexaglue/case-study-banking',
		steps: bankingSteps,
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

export function findStep(
	pathname: string,
): { caseStudy: CaseStudyMeta; step: MigrationStep; position: number } | undefined {
	const cs = findCaseStudy(pathname);
	if (!cs) return undefined;

	const stepSlugMatch = pathname.match(/\/(step-\d+-[\w-]+)\/?$/);
	if (!stepSlugMatch) return undefined;

	const stepIndex = cs.steps.findIndex((s) => s.slug === stepSlugMatch[1]);
	if (stepIndex === -1) return undefined;

	return { caseStudy: cs, step: cs.steps[stepIndex], position: stepIndex + 1 };
}
