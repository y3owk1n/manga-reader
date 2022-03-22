import ChapterContainer from "@/components/Chapter/ChapterContainer";
import Layout from "@/components/Shared/Layout";
import { MangaChapterSwrRes } from "@/types/swrResponse.interface";
import { fetchGetJSON } from "@/utils/apiHelper";
import { Center, Container, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import useSWR from "swr";

const ChapterDetail: FC = () => {
  const router = useRouter();

  const { chapterId, mangaId } = router.query;

  const { data: chapterData, error: chapterError } = useSWR<
    MangaChapterSwrRes,
    Error
  >(
    chapterId && mangaId
      ? `/api/comic-chapter?comicId=${mangaId}&chapterId=${chapterId}`
      : null,
    fetchGetJSON
  );

  if (!chapterId || !mangaId) {
    return (
      <Layout>
        <Container maxW="container.xl" my={6} h="80vh">
          <Text>ChapterID & Manga ID is required</Text>
        </Container>
      </Layout>
    );
  }

  if (chapterError) {
    return (
      <Layout>
        <Container maxW="container.xl" my={6} h="80vh">
          <Text>{chapterError.message}</Text>
        </Container>
      </Layout>
    );
  }

  if (!chapterData) {
    return (
      <Layout>
        <Container maxW="container.xl" my={6} h="80vh">
          <Center h="full">
            <Spinner />
          </Center>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <ChapterContainer chapterData={chapterData.data} />
    </Layout>
  );
};

export default ChapterDetail;
