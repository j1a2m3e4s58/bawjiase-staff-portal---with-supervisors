const baseUrl = import.meta.env.BASE_URL || "/";

export const appBasePath =
  baseUrl === "/" ? "/" : baseUrl.replace(/\/$/, "");

export function withBase(path = ""): string {
  const normalizedPath = path.replace(/^\/+/, "");
  return new URL(normalizedPath, window.location.origin + baseUrl).pathname;
}

export function normalizePublicPath(path?: string | null): string | null {
  if (!path) return null;
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith("data:")) {
    return path;
  }
  return withBase(path);
}
