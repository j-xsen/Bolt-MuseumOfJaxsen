import { createClient } from 'contentful';
import { ArtPiece } from '../types/art';

// Create Contentful client
const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

// Define the Contentful entry type for art pieces based on your schema
interface ContentfulArtEntry {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    date: string;
    media?: string;
    lowRez: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    hiRez: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    ratio: number;
  };
}

// Transform Contentful entry to ArtPiece
const transformContentfulEntry = (entry: ContentfulArtEntry): ArtPiece => {
  const date = new Date(entry.fields.date);
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  
  return {
    id: entry.sys.id,
    title: entry.fields.title,
    artist: 'Jaxsen', // Since all pieces are by Jaxsen
    description: '', // Remove auto-generated descriptions
    imageUrl: `https:${entry.fields.lowRez.fields.file.url}`,
    hiResImageUrl: `https:${entry.fields.hiRez.fields.file.url}`,
    category: entry.fields.media || 'Mixed Media',
    dimensions: calculateDimensions(entry.fields.ratio),
    medium: entry.fields.media || 'Mixed Media',
    year: year,
    month: month,
    artistBio: 'Jaxsen is the visionary founder of Jaxsenville and its inaugural artist-in-residence. As both civic leader and creative force, Jaxsen embodies the unique spirit of a community where governance and artistry intersect to create something entirely new.',
    artistAvatar: 'https://images.ctfassets.net/sjvnthjshuvn/D2KPBNKPj11QyIXDQjd7a/52635151273dfe9d23aca2bbf5275fc6/2.webp',
    ratio: entry.fields.ratio,
  };
};

// Calculate dimensions based on ratio (assuming a standard base size)
const calculateDimensions = (ratio: number): string => {
  const baseWidth = 24; // inches
  const height = Math.round(baseWidth / ratio);
  return `${baseWidth}" x ${height}"`;
};

// Fetch all art pieces from Contentful
export const fetchArtPieces = async (): Promise<ArtPiece[]> => {
  try {
    const response = await client.getEntries<ContentfulArtEntry['fields']>({
      content_type: 'art', // Using your content type ID
      order: '-fields.date', // Order by date, newest first
    });

    return response.items.map((item) => 
      transformContentfulEntry(item as ContentfulArtEntry)
    );
  } catch (error) {
    console.error('Error fetching art pieces from Contentful:', error);
    throw new Error('Failed to fetch art pieces from the exhibition');
  }
};

// Fetch a single art piece by ID
export const fetchArtPieceById = async (id: string): Promise<ArtPiece | null> => {
  try {
    const entry = await client.getEntry<ContentfulArtEntry['fields']>(id);
    return transformContentfulEntry(entry as ContentfulArtEntry);
  } catch (error) {
    console.error(`Error fetching art piece with ID ${id}:`, error);
    return null;
  }
};