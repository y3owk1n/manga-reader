// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MangaDetailData } from "@/types/dmzj.interface";
import { MangaDetailSwrRes } from "@/types/swrResponse.interface";
import { fetchDmzjGetJSON } from "@/utils/apiHelper";
import type { NextApiRequest, NextApiResponse } from "next";

const errorRes = {};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<MangaDetailSwrRes>
) => {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({
      code: 405,
      data: {
        info: {
          id: "",
          title: "",
          subtitle: "",
          types: "",
          zone: "",
          status: "",
          last_update_chapter_name: "",
          last_updatetime: "",
          cover: "",
          authors: "",
          description: "",
          first_letter: "",
          direction: "",
          islong: "",
          copyright: "",
        },
        list: [],
        alone: [],
        similar: [],
      },
      message: "Not Allowed",
    });
  }

  if (!id) {
    return res.status(405).json({
      code: 405,
      data: {
        info: {
          id: "",
          title: "",
          subtitle: "",
          types: "",
          zone: "",
          status: "",
          last_update_chapter_name: "",
          last_updatetime: "",
          cover: "",
          authors: "",
          description: "",
          first_letter: "",
          direction: "",
          islong: "",
          copyright: "",
        },
        list: [],
        alone: [],
        similar: [],
      },
      message: "Id is required",
    });
  }

  try {
    const comicInfoUrl = `http://api.dmzj.com/dynamic/comicinfo/${id}.json`;

    const comicListData = await fetchDmzjGetJSON(comicInfoUrl);

    const comicListDetailData: MangaDetailData = comicListData.data;

    res.status(200).json({
      code: 200,
      data: comicListDetailData,
      message: "Ok",
    });
  } catch (error: any) {
    return res.status(500).json({
      code: 500,
      data: {
        info: {
          id: "",
          title: "",
          subtitle: "",
          types: "",
          zone: "",
          status: "",
          last_update_chapter_name: "",
          last_updatetime: "",
          cover: "",
          authors: "",
          description: "",
          first_letter: "",
          direction: "",
          islong: "",
          copyright: "",
        },
        list: [],
        alone: [],
        similar: [],
      },
      message: error.message,
    });
  }
};

export default handler;
