// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  SearchResults,
  SearchResultsRes,
} from "@/components/Home/SearchBarModal";
import { SearchRoot } from "@/types/kuaikanmanhua.interface";
import { fetchGetHtml, fetchGetJSON } from "@/utils/apiHelper";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SearchResultsRes>
) => {
  const { searchTerm } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({
      code: 405,
      data: [],
      message: "Not Allowed",
    });
  }

  const searchResults: SearchRoot = await fetchGetJSON(
    `https://www.kuaikanmanhua.com/v1/search/topic?q=${searchTerm}&f=3&size=10`
  );

  const searchResultsHtml = await fetchGetHtml(
    `https://www.haoman6.com/index.php/search?key=${searchTerm}`
  );

  const $ = cheerio.load(searchResultsHtml);

  const searchResultsHead = $(".search_head");

  const searchResultsHeadText = searchResultsHead.text();

  if (
    searchResultsHeadText ===
    "很遗憾，您搜索的内容暂时没有找到，我们为您推荐了以下漫画~"
  ) {
    res.status(200).json({
      code: 200,
      data: [],
      message: "No results match",
    });
  } else {
    const searchResultsList = $(".cate-comic-list");

    const searchResultsDataList: SearchResults[] = [];

    searchResultsList.find(".common-comic-item").each((i, elem) => {
      const manga = $(elem);
      const mangaUrl = manga.find(".cover").attr("href") as string;
      const mangaId = mangaUrl.split("/")[2];
      const mangaCoverImg = manga.find("img").attr("data-original") as string;
      const mangaCoverImgWithHttps = mangaCoverImg.replace(
        /^http:\/\//i,
        "https://"
      );

      const mangaDescription = manga.find(".comic-feature").text();

      const mangaTitle = manga.find(".comic__title").find("a").text();

      const mangaLatestEpisode = manga.find(".comic-update").find("a").text();

      searchResultsDataList[i] = {
        id: mangaId,
        coverImg: mangaCoverImgWithHttps,
        title: mangaTitle,
        description: mangaDescription,
        latestEpisode: mangaLatestEpisode,
      };
    });

    res.status(200).json({
      code: 200,
      data: searchResultsDataList,
      message: "Ok",
    });
  }
};

export default handler;
