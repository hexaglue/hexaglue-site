/**
 * French descriptions for Audit plugin parameters.
 */

export const yamlDescriptions: Record<string, string> = {
  failOnError: "Fait échouer le build Maven quand des erreurs d'audit existent",
  errorOnBlocker: "Les violations BLOCKER comptent comme erreurs d'audit",
  errorOnCritical: "Les violations CRITICAL comptent comme erreurs d'audit",
  generateDocs: "Active la génération des diagrammes Mermaid dans un répertoire séparé",
};

export const mavenDescriptions: Record<string, string> = {
  basePackage: "Package racine à analyser pour les violations DDD et hexagonales",
  failOnError: "Fait échouer le build Maven quand des erreurs d'audit existent",
  errorOnBlocker: "Les violations BLOCKER comptent comme erreurs d'audit",
  errorOnCritical: "Les violations CRITICAL comptent comme erreurs d'audit",
  reportDirectory: "Répertoire de sortie pour les rapports d'audit",
  skip: "Désactive complètement l'audit (configurable via <code>-Dhexaglue.skip=true</code>)",
  failOnUnclassified: "Fait échouer le build si des types restent non classifiés après l'analyse",
  tolerantResolution: 'Active la résolution tolérante des types non résolus. Utile pour les projets utilisant des annotation processors (MapStruct, Immutables) dont le code généré n\'est pas encore sur le classpath (configurable via <code>-Dhexaglue.tolerantResolution=true</code>)',
  validationReportPath: 'Chemin du rapport de validation Markdown (goal <code>validate</code> uniquement)',
};
