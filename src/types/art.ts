export interface ArtPiece {
  id: string;
  title: string;
  artist: string;
  description: string;
  imageUrl: string;
  hiResImageUrl?: string;
  category: string;
  dimensions: string;
  medium: string;
  year: number;
  month: string;
  artistBio: string;
  artistAvatar: string;
  ratio: number;
}

export interface TipAmount {
  amount: number;
  label: string;
}