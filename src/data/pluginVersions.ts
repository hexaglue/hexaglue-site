/**
 * Version manifest for plugin documentation pages.
 * Each plugin has a list of documented versions with URLs.
 */

export interface PluginVersion {
	version: string;
	label: string;
	url: string;
	latest?: boolean;
	upcoming?: boolean;
}

export const pluginVersions: Record<string, PluginVersion[]> = {
	'plugin-audit': [
		{ version: '3.0.0', label: 'v3.0.0', url: '/docs/plugin-audit/', latest: true },
		{ version: '2.1.0', label: 'v2.1.0', url: '/docs/plugin-audit/2.1.0/' },
		{ version: '2.0.0', label: 'v2.0.0', url: '/docs/plugin-audit/2.0.0/' },
	],
	'plugin-jpa': [
		{ version: '3.0.0', label: 'v3.0.0', url: '/docs/plugin-jpa/', latest: true },
		{ version: '2.1.0', label: 'v2.1.0', url: '/docs/plugin-jpa/2.1.0/' },
		{ version: '2.0.0', label: 'v2.0.0', url: '/docs/plugin-jpa/2.0.0/' },
	],
	'plugin-living-doc': [
		{ version: '3.0.0', label: 'v3.0.0', url: '/docs/plugin-living-doc/', latest: true },
		{ version: '2.1.0', label: 'v2.1.0', url: '/docs/plugin-living-doc/2.1.0/' },
		{ version: '2.0.0', label: 'v2.0.0', url: '/docs/plugin-living-doc/2.0.0/' },
	],
	'plugin-rest': [
		{ version: '3.1.0', label: 'v3.1.0', url: '/docs/plugin-rest/', latest: true },
	],
};

export default pluginVersions;
