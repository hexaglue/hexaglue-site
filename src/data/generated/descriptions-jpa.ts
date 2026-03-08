/**
 * French descriptions for JPA plugin parameters.
 * Keyed by parameter name. These are merged with the extracted JSON at build time.
 */

export const yamlDescriptions: Record<string, string> = {
  entitySuffix: "Suffixe ajouté aux noms de classes pour les entités JPA générées",
  embeddableSuffix: "Suffixe pour les classes <code>@Embeddable</code> (value objects persistés)",
  repositorySuffix: "Suffixe pour les interfaces Spring Data Repository",
  adapterSuffix: "Suffixe pour les implémentations d'adapter de port",
  mapperSuffix: "Suffixe pour les interfaces MapStruct",
  tablePrefix: "Préfixe ajouté à tous les noms de tables en base",
  enableAuditing: "Génère les champs <code>@CreatedDate</code> et <code>@LastModifiedDate</code>",
  enableOptimisticLocking: "Génère un champ <code>@Version</code> pour le verrouillage optimiste",
  generateRepositories: "Génère les interfaces Spring Data JPA Repository",
  generateMappers: "Génère les mappers MapStruct bidirectionnels",
  generateAdapters: "Génère les implémentations d'adapter de port",
  generateEmbeddables: "Génère les classes <code>@Embeddable</code> pour les value objects",
  infrastructurePackage: "Package cible pour les artefacts JPA générés",
  idStrategy: 'Stratégie <code>@GeneratedValue</code> ajoutée au champ <code>@Id</code> des entités JPA générées. Contrôle comment la base de données attribue les identifiants.',
  outputDirectory: 'Répertoire de sortie spécifique au plugin. Utilisez <code>src/main/java</code> pour écrire les artefacts JPA directement dans votre arbre source au lieu de <code>target/</code>. Les fichiers existants sont écrasés à chaque build (voir note ci-dessous).',
  targetModule: "Multi-module : identifiant du module cible pour le routage des artefacts générés",
};

export const mavenDescriptions: Record<string, string> = {
  basePackage: "Package racine à analyser. Les artefacts JPA sont générés à partir des types de domaine de ce package.",
  outputDirectory: "Répertoire où les entités JPA, repositories et mappers sont écrits",
  skip: 'Désactive complètement l\'exécution de HexaGlue (configurable via <code>-Dhexaglue.skip=true</code>)',
  skipValidation: "Ignore la validation des classifications avant la génération JPA",
  failOnUnclassified: "Fait échouer le build si des types du domaine ne peuvent pas être classifiés",
  tolerantResolution: 'Active la résolution tolérante des types non résolus. Utile pour les projets utilisant des annotation processors (MapStruct, Immutables) dont le code généré n\'est pas encore sur le classpath (configurable via <code>-Dhexaglue.tolerantResolution=true</code>)',
};
