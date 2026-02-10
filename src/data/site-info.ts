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
	title: 'DDD et Architecture Hexagonale pour Java',
	description:
		'Rendez votre architecture DDD et hexagonale visible et gouvernable depuis votre code Java. Audit, documentation vivante et génération d\'infrastructure à la compilation.',
	image: {
		src: '/og/hexaglue.jpg',
		alt: 'HexaGlue - DDD et Architecture Hexagonale pour Java',
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
