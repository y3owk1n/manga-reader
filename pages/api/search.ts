// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MangaList } from "@/types/mangaDexApi.interface";
import { fetchGetJSON } from "@/utils/apiHelper";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<MangaList>
) => {
  const { searchTerm } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({
      data: [],
      limit: 0,
      offset: 0,
      response: "Error",
      result: "Not Allowed",
      total: 0,
    });
  }

  const searchResults: MangaList = await fetchGetJSON(
    `https://api.mangadex.org/manga?title=${searchTerm}&limit=5&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includes[]=cover_art&order[relevance]=desc`
  );

  res.status(200).json(searchResults);
};

export default handler;
