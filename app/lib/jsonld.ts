/**
 * Serialiseert data voor een `<script type="application/ld+json">`-tag.
 * Escapet `<` zodat een eventuele `</script>`-substring in de data de tag
 * niet voortijdig kan sluiten — de standaardmitigatie voor JSON-LD in een
 * script-tag. Alle huidige bronnen zijn statische content (content.ts),
 * geen user input, maar dit is een goedkope, correcte gewoonte.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
