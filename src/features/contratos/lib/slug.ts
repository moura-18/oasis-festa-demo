const ACENTOS: Record<string, string> = {
  á: "a",
  ã: "a",
  â: "a",
  à: "a",
  é: "e",
  ê: "e",
  í: "i",
  ó: "o",
  õ: "o",
  ô: "o",
  ú: "u",
  ü: "u",
  ç: "c",
};

/** Slug kebab-case simples, usado para compor `data-demo-id`/`id` a partir de rótulos em pt-BR. */
export function slugify(texto: string): string {
  return texto
    .toLowerCase()
    .split("")
    .map((char) => ACENTOS[char] ?? char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
