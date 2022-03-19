import BreadcrumbChapter from "@/components/Chapter/BreadcrumbChapter";
import Pagination from "@/components/Chapter/Pagination";
import Layout from "@/components/Shared/Layout";
import {
  ChapterDetails,
  ChapterImages,
  PrevNextChapter,
} from "@/types/manga.interface";
import { fetchGetHtml } from "@/utils/apiHelper";
import {
  Box,
  Container,
  Image as ChakraImage,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as cheerio from "cheerio";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { FC, useEffect, useRef, useState } from "react";
import LazyLoad from "react-lazyload";

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

  const itemsRef = useRef<HTMLImageElement[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, chapterImages.length);
  }, [chapterImages]);

  const handleScroll = () => {
    const currentHeight = window.scrollY + window.innerHeight;

    // console.log("---");
    const items = itemsRef.current.filter((item, index) => {
      // console.log(
      //   `Page ${index + 1}`,
      //   currentHeight,
      //   item.offsetTop + item.height
      // );
      return currentHeight <= item.offsetTop + item.height;
    });

    setCurrentPage(
      items.length <= 0
        ? chapterImages.length
        : chapterImages.length - items.length + 1
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (router.isFallback) {
    return (
      <Box>
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Layout>
      <BreadcrumbChapter
        chapterDetails={chapterDetails}
        currentPage={currentPage}
        totalPages={chapterImages.length}
      />
      <Container maxW="container.xl" my={6}>
        <Stack align="center" maxW="800px" mx="auto">
          <Box>
            {chapterImages.map(({ image, page }) => (
              <LazyLoad key={page} once offset={1000}>
                <ChakraImage
                  ref={(el: HTMLImageElement) =>
                    (itemsRef.current[Number(page) - 1] = el)
                  }
                  id={`page-${page}`}
                  src={image}
                  alt={`Page ${page}`}
                  objectFit={"cover"}
                  key={page}
                  bgColor="gray.100"
                />
              </LazyLoad>
            ))}
          </Box>
          <Pagination prevNextChapterData={prevNextChapterData}>
            {chapterImages.length > 0 && <Text>已是最后一页</Text>}
          </Pagination>
        </Stack>
      </Container>
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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { chapterId } = context.params as IParams;

  const hoaman6ChapterHtml = await fetchGetHtml(
    `https://www.haoman6.com/chapter/${chapterId}`
  );

  if (hoaman6ChapterHtml.includes("redirected")) {
    return {
      notFound: true,
    };
  }
  const $ = cheerio.load(hoaman6ChapterHtml);

  const chapterDetail = $(".rd-article-wr");

  const chapterImages: ChapterImages[] = [];

  const chapterDetailElem = chapterDetail.find(".rd-article__pic");

  chapterDetailElem.each((i, elem) => {
    const chapterDetailElem = $(elem);
    const chapterDetailImageElem = chapterDetailElem.find("img");
    const chapterDetailImage = chapterDetailImageElem.attr("echo-pc") as string;
    const chapterDetailImageWithHttps = chapterDetailImage.replace(
      /^http:\/\//i,
      "https://"
    );
    const chapterDetailPage = chapterDetailElem.attr("data-index") as string;

    chapterImages[i] = {
      page: chapterDetailPage,
      image: chapterDetailImageWithHttps,
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

  const mangaUrl = $(".j-comic-title").attr("href");
  const mangaId = mangaUrl?.split("/")[2] as string;

  const mangaTitle = $(".crumb__title").text();
  const chapterTitle = $(".last-crumb").text();

  const chapterDetails: ChapterDetails = {
    mangaTitle,
    mangaId,
    chapterTitle,
  };

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
