export interface MigrationStep {
	number: number;
	slug: string;
	branch: string;
	title: string;
	shortTitle: string;
	score: number | null;
	grade: string | null;
	status: string | null;
	violations: number | null;
	color: string;
	icon: string;
}

export const steps: MigrationStep[] = [
	{
		number: 0,
		slug: "step-0-legacy",
		branch: "step/0-legacy",
		title: "Application bancaire multi-modules d'origine",
		shortTitle: "Legacy",
		score: null,
		grade: null,
		status: null,
		violations: null,
		color: "red-500",
		icon: "ri/archive-line",
	},
	{
		number: 1,
		slug: "step-1-discovery",
		branch: "step/1-discovery",
		title: "Premier diagnostic avec HexaGlue",
		shortTitle: "Diagnostic",
		score: 14,
		grade: "F",
		status: "FAILED",
		violations: 36,
		color: "red-400",
		icon: "ri/search-eye-line",
	},
	{
		number: 2,
		slug: "step-2-configured",
		branch: "step/2-configured",
		title: "Exclusions centralisées",
		shortTitle: "Configuration",
		score: 21,
		grade: "F",
		status: "FAILED",
		violations: 24,
		color: "orange-400",
		icon: "ri/settings-3-line",
	},
	{
		number: 3,
		slug: "step-3-hexagonal",
		branch: "step/3-hexagonal",
		title: "Restructuration hexagonale",
		shortTitle: "Hexagonal",
		score: 22,
		grade: "F",
		status: "FAILED",
		violations: 24,
		color: "amber-400",
		icon: "ri/layout-masonry-line",
	},
	{
		number: 4,
		slug: "step-4-pure-domain",
		branch: "step/4-pure-domain",
		title: "Purification du domaine",
		shortTitle: "Domaine pur",
		score: 23,
		grade: "F",
		status: "FAILED",
		violations: 29,
		color: "yellow-400",
		icon: "ri/sparkling-2-line",
	},
	{
		number: 5,
		slug: "step-5-generated",
		branch: "step/5-generated",
		title: "Génération automatique de l'infrastructure",
		shortTitle: "Génération",
		score: 66,
		grade: "D",
		status: "PASSED",
		violations: 0,
		color: "emerald-400",
		icon: "ri/code-box-line",
	},
	{
		number: 6,
		slug: "step-6-functional",
		branch: "step/6-functional",
		title: "Application fonctionnelle complète",
		shortTitle: "Fonctionnelle",
		score: 66,
		grade: "D",
		status: "PASSED",
		violations: 0,
		color: "green-400",
		icon: "ri/rocket-line",
	},
];
