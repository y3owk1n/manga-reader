// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MangaChapterData } from "@/types/dmzj.interface";
import { MangaChapterSwrRes } from "@/types/swrResponse.interface";
import { fetchDmzjGetJSON } from "@/utils/apiHelper";
import type { NextApiRequest, NextApiResponse } from "next";

const errorRes = {};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<MangaChapterSwrRes>
) => {
  const { comicId, chapterId } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({
      code: 405,
      data: {
        id: 0,
        comic_id: 0,
        chapter_name: "",
        chapter_order: 0,
        createtime: 0,
        folder: "",
        page_url: [],
        chapter_type: 0,
        chaptertype: 0,
        chapter_true_type: 0,
        chapter_num: 0,
        updatetime: 0,
        sum_pages: 0,
        sns_tag: 0,
        uid: 0,
        username: "",
        translatorid: "",
        translator: "",
        link: "",
        message: "",
        download: "",
        hidden: 0,
        direction: 0,
        filesize: 0,
        picnum: 0,
        hit: 0,
        prev_chap_id: 0,
        comment_count: 0,
      },
      message: "Not Allowed",
    });
  }

  if (!comicId || !chapterId) {
    return res.status(405).json({
      code: 405,
      data: {
        id: 0,
        comic_id: 0,
        chapter_name: "",
        chapter_order: 0,
        createtime: 0,
        folder: "",
        page_url: [],
        chapter_type: 0,
        chaptertype: 0,
        chapter_true_type: 0,
        chapter_num: 0,
        updatetime: 0,
        sum_pages: 0,
        sns_tag: 0,
        uid: 0,
        username: "",
        translatorid: "",
        translator: "",
        link: "",
        message: "",
        download: "",
        hidden: 0,
        direction: 0,
        filesize: 0,
        picnum: 0,
        hit: 0,
        prev_chap_id: 0,
        comment_count: 0,
      },
      message: "Id is required",
    });
  }

  try {
    const chapterInfoUrl = `https://m.dmzj.com/chapinfo/${comicId}/${chapterId}.html`;

    const chapterInfoData: MangaChapterData = await fetchDmzjGetJSON(
      chapterInfoUrl
    );

    res.status(200).json({
      code: 200,
      data: chapterInfoData,
      message: "Ok",
    });
  } catch (error: any) {
    return res.status(500).json({
      code: 500,
      data: {
        id: 0,
        comic_id: 0,
        chapter_name: "",
        chapter_order: 0,
        createtime: 0,
        folder: "",
        page_url: [],
        chapter_type: 0,
        chaptertype: 0,
        chapter_true_type: 0,
        chapter_num: 0,
        updatetime: 0,
        sum_pages: 0,
        sns_tag: 0,
        uid: 0,
        username: "",
        translatorid: "",
        translator: "",
        link: "",
        message: "",
        download: "",
        hidden: 0,
        direction: 0,
        filesize: 0,
        picnum: 0,
        hit: 0,
        prev_chap_id: 0,
        comment_count: 0,
      },
      message: error.message,
    });
  }
};

export default handler;
