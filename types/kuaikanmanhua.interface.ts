export interface HomeRoot {
  code: number;
  data: HomeData;
  message: string;
}

export interface HomeData {
  banners: Banner[];
  categories: Category[];
  daily_topics: DailyTopics;
  discovery_modules: DiscoveryModule[];
  popularity_topics: Topic[];
  ranks: Rank[];
  rec_topics: Topic[];
  ugc_topics: Topic[];
}

export interface Banner {
  action_type: number;
  image_url: string;
  target_id: string;
}

export interface Category {
  icon: any;
  tagId: number;
  title: string;
}

export interface DailyTopics {
  pos: number;
  topics: Topic[];
  week_days: string[];
}

export interface Topic {
  cover_image_url: string;
  description: string;
  id: number;
  likes_count: string;
  signing_status: string;
  square_image_url: string;
  tags: string[];
  title: string;
  update_remind: string;
  user: User;
  vertical_image_url: string;
  view_count_info: string;
}

export interface User {
  avatar: string;
  nickname: string;
  user_id: number;
}

export interface DiscoveryModule {
  title: string;
  topics: Topic[];
}

export interface LatestComic {
  id: number;
  likes_count_number: number;
  locked_code: number;
  title: string;
}

export interface Rank {
  next_update_date: string;
  rank_desc: string;
  rank_id: number;
  title: string;
  topics: Topic[];
}

export interface SearchRoot {
  code: number;
  data: SearchData;
  message: string;
  total: number;
}

export interface SearchData {
  hit: Hit[];
  since: number;
  topic_click_action_type: string;
  total: number;
}

export interface Hit {
  action_type: ActionType;
  category: string[];
  comic_count: number;
  comics_count: number;
  comment_count: number;
  comments_count: number;
  continueReadComic: ContinueReadComic;
  cover_image_url: string;
  created_at: string;
  description: string;
  favourite_count: number;
  first_comic_publish_time: string;
  id: number;
  is_favourite: boolean;
  is_free: boolean;
  is_outer: boolean;
  likes_count: number;
  popularity: number;
  recommend_text: string;
  related_topic_id: number;
  sentence_desc: string;
  strategy_recommendation: string;
  text_mask: string;
  title: string;
  update_status: number;
  user: SearchResUser;
  user_id: number;
  vertical_image_url: string;
  view_count: number;
  coupon?: Coupon;
}

export interface ActionType {
  target_id: number;
  type: number;
}

export interface ContinueReadComic {
  id: number;
  title: string;
}

export interface SearchResUser {
  id: number;
  nickname: string;
}

export interface Coupon {
  icon: string;
}

export interface SingleMangaRoot {
  code: number;
  data: SingleMangaData;
  message: string;
}

export interface SingleMangaData {
  bottom_recommend: BottomRecommend;
  code: number;
  recommend_topics: RecommendTopic[];
  topic_info: TopicInfo;
}

export interface BottomRecommend {
  title: string;
  topic_list: Topic[];
}

export interface User {
  avatar: string;
  user_id: number;
}

export interface RecommendTopic {
  comments_count: string;
  cover_image_url: string;
  description: string;
  id: number;
  likes_count: string;
  origin_comments_count: number;
  origin_likes_count: number;
  title: string;
  vertical_image_url: string;
}

export interface TopicInfo {
  comics: Comic[];
  comics_count: number;
  comments_count: string;
  cover_image_url: string;
  description: string;
  fav_count: string;
  first_comic_id: number;
  id: number;
  is_favourite: boolean;
  is_free: boolean;
  likes_count: string;
  origin_comments_count: number;
  origin_likes_count: number;
  popularity_info: string;
  signing_status: string;
  tags: string[];
  title: string;
  user: User;
  vertical_image_url: string;
}

export interface Comic {
  cover_image_url: string;
  created_at: string;
  id: number;
  is_free: boolean;
  is_pay_comic: boolean;
  label_info?: LabelInfo;
  likes_count: string;
  likes_count_number: number;
  locked: boolean;
  locked_code: number;
  need_vip: boolean;
  title: string;
}

export interface LabelInfo {
  background_color: string;
  background_gradual_color: string;
  text: string;
  text_color: string;
}

export interface ChapterRoot {
  code: number;
  data: ChapterData;
  message: string;
}

export interface ChapterData {
  comic_auth: any;
  comic_info: ComicInfo;
  logged_in: boolean;
  next_comic_info: NextComicInfo;
  previous_comic_id: number;
  recommend_topics: RecommendTopic[];
  share_info: ShareInfo;
  source: string;
  topic_info: TopicInfo;
}

export interface ComicInfo {
  comic_images: ComicImage[];
  cover_image_url: string;
  created_at: string;
  id: number;
  images: string[];
  is_danmu_hidden: boolean;
  is_free: boolean;
  is_ip_block: boolean;
  is_pay_comic: boolean;
  is_published: boolean;
  is_sensitive: boolean;
  liked: boolean;
  likes_count: string;
  likes_count_number: number;
  locked: boolean;
  locked_code: number;
  need_vip: boolean;
  title: string;
}

export interface ComicImage {
  height: number;
  key: string;
  url: string;
  width: number;
}

export interface NextComicInfo {
  next_comic_id: number;
  next_status: number;
}

export interface RecommendTopic {
  description: string;
  id: number;
  tags: string[];
  title: string;
  vertical_image_url: string;
}

export interface ShareInfo {
  action: string;
  content: string;
  title: string;
}

export interface TopicInfo {
  cover_image_url: string;
  description: string;
  id: number;
  is_favourite: boolean;
  is_free: boolean;
  signing_status: string;
  square_image_url: string;
  tags: string[];
  title: string;
  update_remind: string;
  user: User;
  vertical_image_url: string;
}
