import {
  ChapterDetails,
  ChapterImages,
  PrevNextChapter,
} from "./manga.interface";

export interface ChapterImagesRes {
  code: number;
  message: string;
  data: {
    chapterImages: ChapterImages[];
    prevNextChapterData: PrevNextChapter;
    chapterDetails: ChapterDetails;
  };
}
