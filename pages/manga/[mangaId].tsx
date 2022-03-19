import MangaDetailContainer from "@/components/MangaDetail/MangaDetailContainer";
import Layout from "@/components/Shared/Layout";
import { fetchGetHtml } from "@/utils/apiHelper";
import { Box, Container, Text } from "@chakra-ui/react";
import * as cheerio from "cheerio";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { MangaContainer, MangaItem } from "pages";
import { ParsedUrlQuery } from "querystring";
import React, { FC } from "react";

interface Props {
  mangaDetail: MangaDetail;
  mangaChaptersData: ChapterList;
  guessYouLikeData: MangaContainer;
}

const MangaDetail: FC<Props> = ({
  mangaDetail,
  mangaChaptersData,
  guessYouLikeData,
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
      <Container maxW="container.xl" my={6}>
        <MangaDetailContainer
          mangaDetail={mangaDetail}
          mangaChaptersData={mangaChaptersData}
          guessYouLikeData={guessYouLikeData}
        />
      </Container>
    </Layout>
  );
};

export default MangaDetail;

interface IParams extends ParsedUrlQuery {
  mangaId: string;
}

interface PathsData {
  params: {
    mangaId: string;
  };
}

interface MangaDetail {
  coverImg: string;
  title: string;
  tags: MangaDetailTag[];
  description: string;
}

interface MangaDetailTag {
  id: string;
  title: string;
}

export interface ChapterList {
  title: string;
  item: ChapterListDetails[];
}

export interface ChapterListDetails {
  id: string;
  title: string;
  isNew: boolean;
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { mangaId } = context.params as IParams;

  const haoman6MangaDetailHtml = await fetchGetHtml(
    `https://www.haoman6.com/comic/${mangaId}`
  );

  if (haoman6MangaDetailHtml.includes("redirected")) {
    return {
      notFound: true,
    };
  }

  const $ = cheerio.load(haoman6MangaDetailHtml);

  const mangaDetailInfo = $(".de-info-wr .de-info__box");

  const mangaCoverImg = mangaDetailInfo.find("img").attr("src") as string;

  const mangaCoverImgWithHttps = mangaCoverImg.replace(
    /^http:\/\//i,
    "https://"
  );

  const mangaTitle = mangaDetailInfo.find(".comic-title").text();

  const mangaTags: MangaDetailTag[] = [];

  mangaDetailInfo
    .find(".comic-status")
    .children()
    .first()
    .find("b")
    .children()
    .each((i, element) => {
      const mangaTagElement = $(element);
      const mangaTagId = mangaTagElement.attr("href")?.split("/")[3];
      const mangaTagTitle = mangaTagElement.text();

      mangaTags[i] = {
        id: mangaTagId as string,
        title: mangaTagTitle,
      };
    });

  const mangaDescription = mangaDetailInfo.find(".intro-total").text();

  const mangaDetail: MangaDetail = {
    coverImg: mangaCoverImgWithHttps,
    title: mangaTitle,
    tags: mangaTags,
    description: mangaDescription,
  };

  const mangaChapters = $(".de-chapter");

  const mangaChaptersTitle = $(mangaChapters)
    .find(".de-chapter__title")
    .children()
    .first()
    .text();

  const mangaChaptersItem: ChapterListDetails[] = [];

  mangaChapters
    .find(".chapter__list-box")
    .find(".j-chapter-item")
    .each((i, elem) => {
      const singleChapter = $(elem);
      const singleChapterTitle = singleChapter
        .find(".j-chapter-link")
        .text()
        .trim();
      const singleChapterUrl = singleChapter
        .find(".j-chapter-link")
        .attr("href") as string;
      const singleChapterId = singleChapterUrl.split("/")[2];
      const isNewChapter = singleChapter.find(".icon-has-update").length;

      mangaChaptersItem[i] = {
        id: singleChapterId,
        title: singleChapterTitle,
        isNew: isNewChapter <= 0 ? false : true,
      };
    });

  const mangaChaptersData: ChapterList = {
    title: mangaChaptersTitle,
    item: mangaChaptersItem.sort((a, b) => Number(b.id) - Number(a.id)),
  };

  const guessYouLike = $(".guess-u-like");

  const guessYouLikeTitle = $(guessYouLike).find(".guess__title").text();

  const guessYouLikeItem: MangaItem[] = [];

  guessYouLike
    .find(".guess__list")
    .find(".guess-item")
    .each((i, elem) => {
      const singleGuess = $(elem);
      const singleGuessUrl = singleGuess
        .find(".comic__title")
        .find("a")
        .attr("href") as string;
      const singleGuessId = singleGuessUrl.split("/")[2];
      const singleGuessLatestEpisode = singleGuess.find(".cover__tag").text();
      const singleGuessTitle = singleGuess.find(".comic__title").text();
      const singleGuessDescription = singleGuess.find(".comic__feature").text();
      const singleGuessCoverImg = singleGuess
        .find("img")
        .attr("data-original") as string;

      const singleGuessCoverImgWithHttps = singleGuessCoverImg.replace(
        /^http:\/\//i,
        "https://"
      );

      guessYouLikeItem[i] = {
        id: singleGuessId,
        coverImg: singleGuessCoverImgWithHttps,
        title: singleGuessTitle,
        description: singleGuessDescription,
        latestEpisode: singleGuessLatestEpisode,
      };
    });

  const guessYouLikeData: MangaContainer = {
    title: guessYouLikeTitle,
    item: guessYouLikeItem,
  };

  // if (Object.entries(mangaDetail.data.topic_info).length === 0) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      mangaDetail,
      mangaChaptersData,
      guessYouLikeData,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const haoman6HomeHtml = await fetchGetHtml("https://www.haoman6.com");

  const $ = cheerio.load(haoman6HomeHtml);

  const recommendedManga = $(".in-sec-wr .in-sec-wr");

  const recommendedMangaItem: string[] = [];

  recommendedManga.find(".cs-item").each((i, elem) => {
    const manga = $(elem);
    const mangaUrl = manga.find("a").attr("href") as string;
    const mangaId = mangaUrl.split("/")[2];

    recommendedMangaItem[i] = mangaId;
  });

  const pathsData: PathsData[] = [];

  recommendedMangaItem.map((manga) => {
    pathsData.push({
      params: {
        mangaId: manga,
      },
    });
  });

  return {
    paths: pathsData,
    fallback: "blocking",
  };
};
