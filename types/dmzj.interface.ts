export interface RecommendedListItem {
  category_id: number;
  title: string;
  sort: number;
  data: RecommendedListItemData[];
}

export interface RecommendedListItemData {
  cover: string;
  title: string;
  sub_title: string;
  type: number;
  url: string;
  obj_id: number;
  status: string;
  id: number;
}

export interface UpdatedComic {
  data: UpdatedComicData[];
}

export interface UpdatedComicData {
  comidId: number;
  title: string;
  type: number;
  author: string;
  tags: string;
  coverImg: string;
  status: string;
  updatedEpisode?: string;
}

export interface MangaDetailData {
  info: MangaDetailInfo;
  list: MangaDetailChapterList[];
  alone: [];
  similar: MangaDetailSimilarList[];
}

export interface MangaDetailInfo {
  id: string;
  title: string;
  subtitle: string;
  types: string;
  zone: string;
  status: string;
  last_update_chapter_name: string;
  last_updatetime: string;
  cover: string;
  authors: string;
  description: string;
  first_letter: string;
  direction: string;
  islong: string;
  copyright: string;
}

export interface MangaDetailChapterList {
  id: string;
  comic_id: string;
  chapter_name: string;
  chapter_order: string;
  filesize: string;
  createtime: string;
  updatetime: string;
}

export interface MangaDetailSimilarList {
  id: string;
  title: string;
  last_update_chapter_name: string;
  cover: string;
}

export interface MangaChapterData {
  id: number;
  comic_id: number;
  chapter_name: string;
  chapter_order: number;
  createtime: number;
  folder: string;
  page_url: string[];
  chapter_type: number;
  chaptertype: number;
  chapter_true_type: number;
  chapter_num: number;
  updatetime: number;
  sum_pages: number;
  sns_tag: number;
  uid: number;
  username: string;
  translatorid: string;
  translator: string;
  link: string;
  message: string;
  download: string;
  hidden: number;
  direction: number;
  filesize: number;
  picnum: number;
  hit: number;
  prev_chap_id?: number;
  next_chap_id?: number;
  comment_count: number;
}

export interface MangaSearchData {
  _biz: string;
  addtime: number;
  alias_name: string;
  authors: string;
  copyright: number;
  cover: string;
  device_show: number;
  grade: number;
  hidden: number;
  hot_hits: number;
  id: number;
  last_name: string;
  quality: number;
  status: number;
  title: string;
  types: string;
}

export interface RecommendedData {
  category_id: number;
  title: string;
  sort: number;
  data: RecommendedListData[];
}

export interface RecommendedListData {
  cover: string;
  title: string;
  sub_title: string;
  type: number;
  obj_id: number;
  status: string;
}

export interface CategoryData {
  title: string;
  items: CategoryItemData[];
}

export interface CategoryItemData {
  tag_id: number;
  tag_name: string;
}

export interface ComicByCategoryData {
  id: number;
  title: string;
  authors: string;
  status: string;
  cover: string;
  types: string;
  last_updatetime: number;
  num: number;
}
