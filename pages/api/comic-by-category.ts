// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ComicByCategoryData } from "@/types/dmzj.interface";
import { ComicByCategorySwrRes } from "@/types/swrResponse.interface";
import { fetchDmzjGetJSON } from "@/utils/apiHelper";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ComicByCategorySwrRes>
) => {
  const {
    题材 = 0,
    读者群 = 0,
    进度 = 0,
    地域 = 0,
    popularOrLatest = 0,
    page = 0,
  } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({
      code: 405,
      data: [],
      message: "Not Allowed",
    });
  }

  if (
    题材 < 0 ||
    读者群 < 0 ||
    进度 < 0 ||
    地域 < 0 ||
    popularOrLatest < 0 ||
    page < 0
  ) {
    return res.status(405).json({
      code: 405,
      data: [],
      message: "Page and type are both required",
    });
  }

  try {
    const baseUrl = `https://v3api.dmzj.com/`;
    const comicByCategoryUrl = `${baseUrl}classify/${题材}-${读者群}-${进度}-${地域}/${popularOrLatest}/${page}.json`;

    const comicByCategoryData: ComicByCategoryData[] = await fetchDmzjGetJSON(
      comicByCategoryUrl
    );

    res.status(200).json({
      code: 200,
      data: comicByCategoryData,
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
