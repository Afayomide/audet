export interface MusicBlog {
    id: string;
    title: string;
    blog_title: string;
    type: string
    artist: string;
    cover: string;
    duration: number;
    album: string;
    genre: string;
    release_date: string;
    plays: number;
    description: [string];
    highlights: [string];
    latest: boolean;
    trending: boolean;
    musicFilePath: string;
    // Add other fields as needed
  }