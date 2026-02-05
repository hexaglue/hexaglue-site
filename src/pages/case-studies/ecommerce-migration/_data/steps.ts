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
		title: "Le monolithe Spring Boot d'origine",
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
		shortTitle: "Découverte",
		score: 13,
		grade: "F",
		status: "FAILED",
		violations: 43,
		color: "red-400",
		icon: "ri/search-eye-line",
	},
	{
		number: 2,
		slug: "step-2-configured",
		branch: "step/2-configured",
		title: "Suppression du bruit",
		shortTitle: "Configuration",
		score: 21,
		grade: "F",
		status: "FAILED",
		violations: 30,
		color: "orange-400",
		icon: "ri/settings-3-line",
	},
	{
		number: 3,
		slug: "step-3-hexagonal",
		branch: "step/3-hexagonal",
		title: "Réorganisation en couches hexagonales",
		shortTitle: "Hexagonal",
		score: 40,
		grade: "F",
		status: "FAILED",
		violations: 18,
		color: "amber-400",
		icon: "ri/layout-masonry-line",
	},
	{
		number: 4,
		slug: "step-4-pure-domain",
		branch: "step/4-pure-domain",
		title: "Purification du domaine",
		shortTitle: "Domaine pur",
		score: 49,
		grade: "F",
		status: "PASSED_WITH_WARNINGS",
		violations: 13,
		color: "yellow-400",
		icon: "ri/sparkling-2-line",
	},
	{
		number: 5,
		slug: "step-5-generated",
		branch: "step/5-generated",
		title: "Génération automatique de l'infrastructure",
		shortTitle: "Génération",
		score: 60,
		grade: "D",
		status: "PASSED_WITH_WARNINGS",
		violations: 3,
		color: "emerald-400",
		icon: "ri/code-box-line",
	},
	{
		number: 6,
		slug: "step-6-functional",
		branch: "main",
		title: "Architecture hexagonale opérationnelle",
		shortTitle: "Fonctionnelle",
		score: 63,
		grade: "D",
		status: "PASSED_WITH_WARNINGS",
		violations: 1,
		color: "green-400",
		icon: "ri/rocket-line",
	},
];
