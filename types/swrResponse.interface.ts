import {
  CategoryData,
  ComicByCategoryData,
  MangaChapterData,
  MangaDetailData,
  MangaSearchData,
  RecommendedData,
  UpdatedComicData,
} from "./dmzj.interface";

export interface UpdatedComicSwrRes {
  code: number;
  message: string;
  data: UpdatedComicData[];
}

export interface MangaDetailSwrRes {
  code: number;
  message: string;
  data: MangaDetailData;
}

export interface MangaChapterSwrRes {
  code: number;
  message: string;
  data: MangaChapterData;
}

export interface MangaSearchSwrRes {
  code: number;
  message: string;
  data: MangaSearchData[];
}

export interface RecommendedSwrRes {
  code: number;
  message: string;
  data: RecommendedData[];
}

export interface CategorySwrRes {
  code: number;
  message: string;
  data: CategoryData[];
}

export interface ComicByCategorySwrRes {
  code: number;
  message: string;
  data: ComicByCategoryData[];
}
