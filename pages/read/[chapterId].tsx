import Pagination from "@/components/Chapter/Pagination";
import Layout from "@/components/Shared/Layout";
import { fetchGetHtml } from "@/utils/apiHelper";
import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";
import * as cheerio from "cheerio";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { FC } from "react";

interface Props {
  chapterImages: ChapterImages[];
  prevNextChapterData: PrevNextChapter;
  chapterDetails: ChapterDetails;
}

const ChapterDetail: FC<Props> = ({
  chapterImages,
  prevNextChapterData,
  chapterDetails,
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Box>
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Layout>
      <Stack align="center" maxW="800px" mx="auto">
        <Text>{chapterDetails.mangaTitle}</Text>
        <Heading as="h2">{chapterDetails.chapterTitle}</Heading>
        <Box>
          {chapterImages.map(({ image, page }) => (
            <Image
              loading={"lazy"}
              src={image}
              alt={`Page ${page}`}
              objectFit={"cover"}
              w="full"
              key={page}
            />
          ))}
        </Box>
        <Pagination prevNextChapterData={prevNextChapterData}>
          {chapterImages.length > 0 && <Text>已是最后一页</Text>}
        </Pagination>
      </Stack>
    </Layout>
  );
};

export default ChapterDetail;

interface IParams extends ParsedUrlQuery {
  chapterId: string;
}

interface PathsData {
  params: {
    chapterId: string;
  };
}

export interface ChapterImages {
  page: string;
  image: string;
}

export interface PrevNextChapter {
  hasPrev: boolean;
  prevChapterId: string | null;
  hasNext: boolean;
  nextChapterId: string | null;
}

export interface ChapterDetails {
  mangaTitle: string;
  chapterTitle: string;
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { chapterId } = context.params as IParams;

  const hoaman6ChapterHtml = await fetchGetHtml(
    `https://www.haoman6.com/chapter/${chapterId}`
  );

  const $ = cheerio.load(hoaman6ChapterHtml);

  const chapterDetail = $(".rd-article-wr");

  const chapterImages: ChapterImages[] = [];

  chapterDetail.find(".rd-article__pic").each((i, elem) => {
    const chapterDetailElem = $(elem);
    const chapterDetailImageElem = chapterDetailElem.find("img");
    const chapterDetailImage = chapterDetailImageElem.attr("echo-pc") as string;
    const chapterDetailPage = chapterDetailElem.attr("data-index") as string;

    chapterImages[i] = {
      page: chapterDetailPage,
      image: chapterDetailImage,
    };
  });

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

  const mangaTitle = $(".crumb__title").text();
  const chapterTitle = $(".last-crumb").text();

  const chapterDetails: ChapterDetails = {
    mangaTitle,
    chapterTitle,
  };

  // if (chapterDetail.code === 10100) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      chapterImages: chapterImages.sort(
        (a, b) => Number(a.page) - Number(b.page)
      ),
      prevNextChapterData,
      chapterDetails,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pathsData: PathsData[] = [
    {
      params: {
        chapterId: "1487178",
      },
    },
  ];

  return {
    paths: pathsData,
    fallback: "blocking",
  };
};
