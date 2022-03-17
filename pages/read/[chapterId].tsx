import Layout from "@/components/Shared/Layout";
import {
  ChapterList,
  IndividualChapter,
  ReadChapter,
} from "@/types/mangaDexApi.interface";
import { fetchGetJSON } from "@/utils/apiHelper";
import { Box, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { FC } from "react";
import ReaderCarousel from "../../components/MangaDetail/ReaderCarousel";

interface Props {
  chapterDetail: IndividualChapter;
  viewChapters: ReadChapter;
}

const ChapterDetail: FC<Props> = ({ chapterDetail, viewChapters }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Box>
        <Text>Loading...</Text>
      </Box>
    );
  }

  const formattedImages = viewChapters.chapter.data.map((c, index) => {
    return {
      src: `${viewChapters.baseUrl}/data/${viewChapters.chapter.hash}/${c}`,
      alt: `${chapterDetail.data.attributes.title} - ${index + 1}`,
    };
  });

  return (
    <Layout>
      <ReaderCarousel images={formattedImages} />
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

  const chapterDetail: IndividualChapter = await fetchGetJSON(
    `https://api.mangadex.org/chapter/${chapterId}`
  );

  const viewChapters: ReadChapter = await fetchGetJSON(
    `https://api.mangadex.org/at-home/server/${chapterId}`
  );

  if (chapterDetail.result === "error" || viewChapters.result === "error") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      chapterDetail,
      viewChapters,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const chapterList: ChapterList = await fetchGetJSON(
    `https://api.mangadex.org/chapter`
  );

  const pathsData: PathsData[] = [];

  chapterList.data?.map((chapter) => {
    pathsData.push({
      params: {
        chapterId: chapter.id,
      },
    });
  });

  return {
    paths: pathsData,
    fallback: "blocking",
  };
};
