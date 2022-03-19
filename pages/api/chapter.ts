// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  ChapterDetails,
  ChapterImages,
  PrevNextChapter,
} from "@/types/manga.interface";
import { ChapterImagesRes } from "@/types/swrResponse.interface";
import { fetchGetHtml } from "@/utils/apiHelper";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";
import probe from "probe-image-size";

const errorResponse = {
  chapterImages: [],
  prevNextChapterData: {
    hasPrev: false,
    prevChapterId: "",
    hasNext: false,
    nextChapterId: "",
  },
  chapterDetails: {
    mangaId: "",
    mangaTitle: "",
    chapterTitle: "",
  },
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ChapterImagesRes>
) => {
  const { chapterId } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({
      code: 405,
      data: errorResponse,
      message: "Not Allowed",
    });
  }

  try {
    const hoaman6ChapterHtml = await fetchGetHtml(
      `https://www.haoman6.com/chapter/${chapterId}`
    );

    if (hoaman6ChapterHtml.includes("redirected")) {
      return res.status(404).json({
        code: 404,
        data: errorResponse,
        message: "No data",
      });
    }

    const $ = cheerio.load(hoaman6ChapterHtml);

    const chapterImages: ChapterImages[] = [];

    const chapterDetail = $(".rd-article-wr");

    const chapterDetailElem = chapterDetail.find(".rd-article__pic");

    try {
      await Promise.all(
        chapterDetailElem.map(async (i, elem) => {
          const chapterDetailElem = $(elem);
          const chapterDetailImageElem = chapterDetailElem.find("img");
          const chapterDetailImage = chapterDetailImageElem.attr(
            "echo-pc"
          ) as string;
          const chapterDetailImageWithHttps = chapterDetailImage.replace(
            /^http:\/\//i,
            "https://"
          );
          const chapterDetailPage = chapterDetailElem.attr(
            "data-index"
          ) as string;

          const imageSizeProbe = await probe(chapterDetailImageWithHttps);
          const imageWidth = imageSizeProbe.width;
          const imageHeight = imageSizeProbe.height;

          chapterImages[i] = {
            page: chapterDetailPage,
            image: chapterDetailImageWithHttps,
            width: imageWidth,
            height: imageHeight,
          };
        })
      );
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        data: errorResponse,
        message: (error as Error).message,
      });
    }

    const asideToolbar = $(".rd-aside");
    const prevChapterElem = asideToolbar.find(".j-rd-prev");
    const nextChapterElem = asideToolbar.find(".j-rd-next");

    const prevChapterUrl = prevChapterElem.attr("_href");
    const prevChapterId = prevChapterUrl?.split("/")[2];
    const nextChapterUrl = nextChapterElem.attr("_href");
    const nextChapterId = nextChapterUrl?.split("/")[2];

    const prevNextChapterData: PrevNextChapter = {
      hasNext: nextChapterUrl ? true : false,
      nextChapterId: nextChapterId ?? null,
      hasPrev: prevChapterUrl ? true : false,
      prevChapterId: prevChapterId ?? null,
    };

    const mangaUrl = $(".j-comic-title").attr("href");
    const mangaId = mangaUrl?.split("/")[2] as string;

    const mangaTitle = $(".crumb__title").text();
    const chapterTitle = $(".last-crumb").text();

    const chapterDetails: ChapterDetails = {
      mangaTitle,
      mangaId,
      chapterTitle,
    };

    res.status(200).json({
      code: 200,
      data: {
        chapterImages: chapterImages.sort(
          (a, b) => Number(a.page) - Number(b.page)
        ),
        prevNextChapterData,
        chapterDetails,
      },
      message: "Ok",
    });
  } catch (error: any) {
    return res.status(500).json({
      code: 500,
      data: errorResponse,
      message: error.message,
    });
  }
};

export default handler;
