/**
 * French descriptions for Living Documentation plugin parameters.
 */

export const yamlDescriptions: Record<string, string> = {
  outputDir: 'Répertoire de sortie pour les fichiers de documentation (relatif à <code>target/hexaglue/reports/</code>)',
  generateDiagrams: 'Active la génération de diagrammes Mermaid dans un fichier <code>diagrams.md</code> dédié',
  maxPropertiesInDiagram: "Nombre maximum de propriétés affichées par classe dans les diagrammes",
  includeDebugSections: 'Inclut les sections de debug (classification trace, source location) dans <code>domain.md</code> et <code>ports.md</code>. Mettre à <code>false</code> pour une documentation plus concise.',
  outputDirectory: "Répertoire de sortie spécifique au plugin, surchargeant le répertoire global",
};

export const mavenDescriptions: Record<string, string> = {
  basePackage: "Package racine à analyser. La documentation est générée à partir des types de domaine de ce package.",
  outputDirectory: "Répertoire de base pour les fichiers générés",
  skip: 'Désactive complètement l\'exécution de HexaGlue (configurable via <code>-Dhexaglue.skip=true</code>)',
  skipValidation: "Ignore la validation des classifications avant la génération de la documentation",
  failOnUnclassified: "Fait échouer le build si des types du domaine ne peuvent pas être classifiés",
  tolerantResolution: 'Active la résolution tolérante des types non résolus. Utile pour les projets utilisant des annotation processors (MapStruct, Immutables) dont le code généré n\'est pas encore sur le classpath (configurable via <code>-Dhexaglue.tolerantResolution=true</code>)',
};
