export interface MangaList {
  data: Daum[];
  limit: number;
  offset: number;
  response: string;
  result: string;
  total: number;
}

export interface MangaDetail {
  data: Daum;
  result: string;
  response: string;
}

export interface Daum {
  attributes: Attributes;
  id: string;
  relationships: Relationship[];
  type: string;
}

export interface Attributes {
  altTitles: AltTitle[];
  availableTranslatedLanguages: string[];
  chapterNumbersResetOnNewVolume: boolean;
  contentRating: string;
  createdAt: string;
  description: Description;
  isLocked: boolean;
  lastChapter: string;
  lastVolume: string;
  links: Links;
  originalLanguage: string;
  publicationDemographic: string;
  state: string;
  status: string;
  tags: Tag[];
  title: Title;
  updatedAt: string;
  version: number;
  year?: number;
}

export interface AltTitle {
  ja?: string;
  id?: string;
  ru?: string;
  en?: string;
  "es-la"?: string;
  vi?: string;
  fa?: string;
  th?: string;
  zh?: string;
  "zh-hk"?: string;
  ko?: string;
  ar?: string;
  hi?: string;
}

export interface Description {
  en: string;
  pt?: string;
  ru?: string;
  "es-la"?: string;
  ja?: string;
  "pt-br"?: string;
}

export interface Links {
  al?: string;
  amz?: string;
  ap?: string;
  bw?: string;
  ebj?: string;
  engtl: string;
  kt?: string;
  mal: string;
  mu: string;
  raw?: string;
  cdj?: string;
}

export interface Tag {
  attributes: Attributes2;
  id: string;
  relationships: any[];
  type: string;
}

export interface Attributes2 {
  description: any[];
  group: string;
  name: Name;
  version: number;
}

export interface Name {
  en: string;
}

export interface Title {
  en: string;
}

export interface Relationship {
  id: string;
  type: string;
  attributes?: Attributes3;
  related?: string;
}

export interface Attributes3 {
  createdAt: string;
  description: string;
  fileName: string;
  locale: string;
  updatedAt: string;
  version: number;
  volume?: string;
}

export interface ChapterAndVolumes {
  result: string;
  volumes: Volumes;
}

export interface Volumes {
  [key: string]: VolumesDetail;
}

export interface VolumesDetail {
  volume: string;
  count: number;
  chapters: Chapter;
}

export interface Chapter {
  [key: string]: ChapterDetail;
}

export interface ChapterDetail {
  chapter: string;
  id: string;
  others: string[];
  count: number;
}

export interface ChapterList {
  result: string;
  response: string;
  data: DaumChapterList[];
  limit: number;
  offset: number;
  total: number;
}

export interface IndividualChapter {
  result: string;
  response: string;
  data: DaumChapterList;
}

export interface DaumChapterList {
  id: string;
  type: string;
  attributes: AttributesChapterList;
  relationships: Relationship[];
}

export interface AttributesChapterList {
  volume: string;
  chapter: string;
  title: string;
  translatedLanguage: string;
  externalUrl: any;
  publishAt: string;
  readableAt: string;
  createdAt: string;
  updatedAt: string;
  pages: number;
  version: number;
}

export interface ReadChapter {
  result: string;
  baseUrl: string;
  chapter: ReadChapterDetail;
}

export interface ReadChapterDetail {
  hash: string;
  data: string[];
  dataSaver: string[];
}
