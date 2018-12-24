export interface IManga {
    id: string;
    title: string;
    artist: string;
    author: string;
    categories: string[];
    description: string;
    chapters: any[][];
    last_chapter_date: number;
}
