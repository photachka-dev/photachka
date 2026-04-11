/** Path unutar bucket-a `portfolio` iz javnog URL-a objekta. */
export function portfolioObjectPathFromPublicUrl(imageUrl: string): string | null {
  try {
    const url = new URL(imageUrl);
    const parts = url.pathname.split("/storage/v1/object/public/portfolio/");
    return parts[1] || null;
  } catch {
    return null;
  }
}
