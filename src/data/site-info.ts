export type SocialLink = {
	/** Longer descriptive label, e.g. `"Voir HexaGlue sur GitHub"` */
	text: string;
	/** Short label with the name of the platform, e.g. `"GitHub"`*/
	label: string;
	/** Icon name for use with `astro-icon`, e.g. `"social/github"`. */
	icon: string;
	/** URL for our profile on the external platform. */
	href: string;
	/** Platform ID, e.g. `"github"`. */
	platform: string;
	/** Whether this platform should be linked in the site header */
	showInHeader?: boolean;
};

type SiteInfo = {
	name: string;
	title: string;
	description: string;
	image: {
		src: string;
		alt: string;
	};
	socialLinks: SocialLink[];
};

const siteInfo: SiteInfo = {
	name: 'HexaGlue',
	title: 'Audit et migration d\'architecture Java',
	description:
		'Outil de migration Java : classification automatique, audit d\'architecture, living documentation et génération de code. Sans vendor lock-in.',
	image: {
		src: '/og/hexaglue.jpg',
		alt: 'HexaGlue - Audit et migration d\'architecture hexagonale Java',
	},
	socialLinks: [
		{
			platform: 'github',
			icon: 'social/github',
			label: 'GitHub',
			text: 'Voir HexaGlue sur GitHub',
			href: 'https://github.com/hexaglue/hexaglue',
			showInHeader: true,
		},
	],
};

export default siteInfo;
