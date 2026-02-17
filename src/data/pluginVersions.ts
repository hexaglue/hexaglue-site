/**
 * Version manifest for plugin documentation pages.
 * Each plugin has a list of documented versions with URLs.
 */

export interface PluginVersion {
	version: string;
	label: string;
	url: string;
	latest?: boolean;
}

export const pluginVersions: Record<string, PluginVersion[]> = {
	'plugin-audit': [
		{ version: '2.1.0', label: 'v2.1.0 (latest)', url: '/docs/plugin-audit/', latest: true },
		{ version: '2.0.0', label: 'v2.0.0', url: '/docs/plugin-audit/2.0.0/' },
	],
	'plugin-jpa': [
		{ version: '2.1.0', label: 'v2.1.0 (latest)', url: '/docs/plugin-jpa/', latest: true },
		{ version: '2.0.0', label: 'v2.0.0', url: '/docs/plugin-jpa/2.0.0/' },
	],
	'plugin-living-doc': [
		{ version: '2.1.0', label: 'v2.1.0 (latest)', url: '/docs/plugin-living-doc/', latest: true },
		{ version: '2.0.0', label: 'v2.0.0', url: '/docs/plugin-living-doc/2.0.0/' },
	],
};

export default pluginVersions;
