// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MangaSearchData } from "@/types/dmzj.interface";
import { MangaSearchSwrRes } from "@/types/swrResponse.interface";
import { fetchDmzjGetJSON } from "@/utils/apiHelper";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<MangaSearchSwrRes>
) => {
  const { searchType, searchKeyword, searchPage } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({
      code: 405,
      data: [],
      message: "Not Allowed",
    });
  }

  const searchUrl = `https://v3api.dmzj.com/search/show/${searchType}/${encodeURI(
    searchKeyword as string
  )}/${searchPage}.json`;

  const comicListData: MangaSearchData[] = await fetchDmzjGetJSON(searchUrl);

  res.status(200).json({
    code: 200,
    data: comicListData,
    message: "Ok",
  });
};

export default handler;
