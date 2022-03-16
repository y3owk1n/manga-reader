import MangaDetailContainer from "@/components/MangaDetail/MangaDetailContainer";
import Layout from "@/components/Shared/Layout";
import {
  ChapterAndVolumes,
  MangaDetail,
  MangaList,
} from "@/types/mangaDexApi.interface";
import { fetchGetJSON } from "@/utils/apiHelper";
import { Box, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { FC } from "react";

interface Props {
  mangaDetail: MangaDetail;
  mangaVolumeAndChapter: ChapterAndVolumes;
}

const MangaDetail: FC<Props> = ({ mangaDetail, mangaVolumeAndChapter }) => {
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
      <MangaDetailContainer
        mangaDetail={mangaDetail.data}
        mangaVolumeAndChapter={mangaVolumeAndChapter.volumes}
      />
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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { mangaId } = context.params as IParams;

  const mangaDetail: MangaDetail = await fetchGetJSON(
    `https://api.mangadex.org/manga/${mangaId}?includes[]=cover_art`
  );

  const mangaVolumeAndChapter: ChapterAndVolumes = await fetchGetJSON(
    `https://api.mangadex.org/manga/${mangaId}/aggregate`
  );

  if (!mangaDetail) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      mangaDetail,
      mangaVolumeAndChapter,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const mangaList: MangaList = await fetchGetJSON(
    "https://api.mangadex.org/manga?includes[]=cover_art&order[updatedAt]=desc"
  );

  const pathsData: PathsData[] = [];

  mangaList.data?.map((manga) => {
    pathsData.push({
      params: {
        mangaId: manga.id,
      },
    });
  });

  return {
    paths: pathsData,
    fallback: "blocking",
  };
};
