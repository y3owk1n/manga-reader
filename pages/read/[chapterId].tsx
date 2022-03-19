import BreadcrumbChapter from "@/components/Chapter/BreadcrumbChapter";
import Pagination from "@/components/Chapter/Pagination";
import Layout from "@/components/Shared/Layout";
import {
  ChapterDetails,
  ChapterImages,
  PrevNextChapter,
} from "@/types/manga.interface";
import { fetchGetHtml } from "@/utils/apiHelper";
import { Box, chakra, Container, Stack, Text } from "@chakra-ui/react";
import * as cheerio from "cheerio";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import probe from "probe-image-size";
import { ParsedUrlQuery } from "querystring";
import React, { FC, useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
  chapterImages: ChapterImages[];
  prevNextChapterData: PrevNextChapter;
  chapterDetails: ChapterDetails;
}

const LazyLoadChakra = chakra(LazyLoadImage, {
  shouldForwardProp: (prop) =>
    ["alt", "src", "objectFit", "effect", "height", "width"].includes(prop),
});

const ChapterDetail: FC<Props> = ({
  chapterImages,
  prevNextChapterData,
  chapterDetails,
}) => {
  const router = useRouter();

  const itemsRef = useRef<HTMLDivElement[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, chapterImages.length);
  }, [chapterImages]);

  useEffect(() => {
    const handleScroll = () => {
      const currentHeight = window.scrollY + window.innerHeight;

      // console.log("---");
      const items = itemsRef.current.filter((item, index) => {
        // console.log(
        //   `Page ${index + 1}`,
        //   currentHeight,
        //   item.offsetTop + item.height
        // );
        return currentHeight <= item.offsetTop + item.clientHeight;
      });

      setCurrentPage(
        items.length <= 0
          ? chapterImages.length
          : chapterImages.length - items.length + 1
      );
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [chapterImages.length]);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      itemsRef.current = [];
      setCurrentPage(1);
    });
  }, [router.events]);

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
          <Box w="full">
            {chapterImages.map(({ image, page, width, height }) => (
              <Box
                key={page}
                w="full"
                ref={(el: HTMLDivElement) =>
                  (itemsRef.current[Number(page) - 1] = el)
                }
              >
                <LazyLoadChakra
                  id={`page-${page}`}
                  src={image}
                  height={height}
                  width={width}
                  alt={`Page ${page}`}
                  objectFit={"cover"}
                  key={page}
                  bgColor="gray.100"
                />
              </Box>
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
      const chapterDetailPage = chapterDetailElem.attr("data-index") as string;

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
