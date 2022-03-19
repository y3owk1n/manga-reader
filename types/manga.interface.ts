export interface MangaContainer {
  title: string;
  item: MangaItem[];
}

export interface MangaItem {
  id: string;
  coverImg: string;
  title: string;
  latestEpisode: string;
  description: string;
}

export interface PopularMangaContainer {
  title: string;
  item: PopularMangaList[];
}

export interface PopularMangaList {
  id: string;
  rank: string;
  title: string;
}

export interface ChapterImages {
  page: string;
  image: string;
}

export interface PrevNextChapter {
  hasPrev: boolean;
  prevChapterId: string | null;
  hasNext: boolean;
  nextChapterId: string | null;
}

export interface ChapterDetails {
  mangaId: string;
  mangaTitle: string;
  chapterTitle: string;
}

export interface MangaDetail {
  coverImg: string;
  title: string;
  tags: MangaDetailTag[];
  description: string;
}

export interface MangaDetailTag {
  id: string;
  title: string;
}

export interface ChapterList {
  title: string;
  item: ChapterListDetails[];
}

export interface ChapterListDetails {
  id: string;
  title: string;
  isNew: boolean;
}
