export function toSlug(name: string, platform: string | null): string {
  const namePart = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const platformPart = (platform ?? "unknown")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${namePart}--${platformPart}`;
}

export function fromSlug(slug: string): { name: string; platform: string } {
  const [namePart, platformPart] = slug.split("--");
  return {
    name: namePart.replace(/-/g, " "),
    platform: platformPart?.replace(/-/g, " ") ?? "",
  };
}