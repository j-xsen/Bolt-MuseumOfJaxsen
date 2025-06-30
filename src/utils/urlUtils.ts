/**
 * Converts a string to a URL-friendly slug
 */
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Converts a slug back to a readable title (for display purposes)
 */
export const slugToTitle = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Finds an art piece by its slug
 */
export const findArtPieceBySlug = (artPieces: any[], slug: string) => {
  return artPieces.find(piece => createSlug(piece.title) === slug);
};