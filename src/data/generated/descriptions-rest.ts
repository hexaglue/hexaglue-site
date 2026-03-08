/**
 * French descriptions for REST plugin parameters.
 */

export const yamlDescriptions: Record<string, string> = {
  apiPackage: "Package cible pour les artefacts REST. Si omis, le plugin dérive automatiquement le package API à partir des packages des ports driving.",
  controllerSuffix: "Suffixe ajouté aux noms de classes pour les controllers REST générés",
  requestDtoSuffix: "Suffixe pour les records DTO de requête",
  responseDtoSuffix: "Suffixe pour les records DTO de réponse",
  basePath: "Préfixe URL pour tous les endpoints générés",
  generateOpenApiAnnotations: 'Génère les annotations <code>@Tag</code>, <code>@Operation</code> et <code>@ApiResponse</code> pour la documentation Swagger/OpenAPI',
  flattenValueObjects: "Aplatit les value objects multi-champs dans les DTOs. Par exemple, <code>Money(amount, currency)</code> devient deux champs distincts dans le DTO.",
  generateExceptionHandler: 'Génère un <code>@RestControllerAdvice</code> global pour la gestion centralisée des erreurs',
  exceptionHandlerClassName: "Nom de la classe du handler d'exceptions",
  generateConfiguration: 'Génère une classe <code>@Configuration</code> avec des <code>@Bean</code> exposant les application services via leurs ports driving',
  exceptionMappings: 'Mappings personnalisés exception → code HTTP. Exemple : <code>"OrderNotFoundException": 404</code>',
  targetModule: "Multi-module : identifiant du module cible pour le routage des artefacts générés",
};

export const mavenDescriptions: Record<string, string> = {
  basePackage: "Package racine à analyser. Les controllers REST sont générés à partir des ports driving de ce package.",
  outputDirectory: "Répertoire où les controllers, DTOs et configuration sont écrits",
  skip: 'Désactive complètement l\'exécution de HexaGlue (configurable via <code>-Dhexaglue.skip=true</code>)',
  skipValidation: "Ignore la validation des classifications avant la génération REST",
  failOnUnclassified: "Fait échouer le build si des types du domaine ne peuvent pas être classifiés",
  tolerantResolution: 'Active la résolution tolérante des types non résolus. Utile pour les projets utilisant des annotation processors (MapStruct, Immutables) dont le code généré n\'est pas encore sur le classpath (configurable via <code>-Dhexaglue.tolerantResolution=true</code>)',
};
