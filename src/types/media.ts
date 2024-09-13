export interface MusicBlog {
    _id: string;
    title: string;
    blogTitle: string;
    type: string
    artist: string;
    cover: string;
    duration: number;
    album: string;
    genre: string;
    releaseDate: string;
    plays: number;
    description: [string];
    highlights: [string];
    latest: boolean;
    trending: boolean;
    musicFilePath: string;
    // Add other fields as needed
  }