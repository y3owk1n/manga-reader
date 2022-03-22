// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { RecommendedData } from "@/types/dmzj.interface";
import { RecommendedSwrRes } from "@/types/swrResponse.interface";
import { fetchDmzjGetJSON } from "@/utils/apiHelper";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RecommendedSwrRes>
) => {
  if (req.method !== "GET") {
    return res.status(405).json({
      code: 405,
      data: [],
      message: "Not Allowed",
    });
  }

  try {
    const recommendedList = `https://v3api.dmzj.com/v3/recommend.json`;

    const comicListData: RecommendedData[] = await fetchDmzjGetJSON(
      recommendedList
    );

    // ID that needed = 47, 52, 53, 54, 56

    const filteredComicListData = comicListData.filter(
      (cat) =>
        cat.category_id === 47 ||
        cat.category_id === 52 ||
        cat.category_id === 53 ||
        cat.category_id === 54 ||
        cat.category_id === 56
    );

    res.status(200).json({
      code: 200,
      data: filteredComicListData,
      message: "Ok",
    });
  } catch (error: any) {
    return res.status(500).json({
      code: 500,
      data: [],
      message: error.message,
    });
  }
};

export default handler;
