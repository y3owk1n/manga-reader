import ChapterContainer from "@/components/Chapter/ChapterContainer";
import Layout from "@/components/Shared/Layout";
import { ChapterImagesRes } from "@/types/swrResponse.interface";
import { fetchGetJSON } from "@/utils/apiHelper";
import { Center, Container, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import useSWR from "swr";

const ChapterDetail: FC = () => {
  const router = useRouter();

  const { chapterId } = router.query;

  const { data: chapterData, error: chapterError } = useSWR<
    ChapterImagesRes,
    Error
  >(chapterId ? `/api/chapter?chapterId=${chapterId}` : null, fetchGetJSON);

  if (!chapterId) {
    return (
      <Layout>
        <Container maxW="container.xl" my={6} h="80vh">
          <Text>No chapter ID</Text>
        </Container>
      </Layout>
    );
  }

  if (chapterError) {
    console.log("chapterError", chapterError);
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

  if (chapterData.code !== 200) {
    return (
      <Layout>
        <Container maxW="container.xl" my={6} h="80vh">
          <Text>{chapterData.message}</Text>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <ChapterContainer
        chapterDetails={chapterData.data.chapterDetails}
        chapterImages={chapterData.data.chapterImages}
        prevNextChapterData={chapterData.data.prevNextChapterData}
      />
    </Layout>
  );
};

export default ChapterDetail;
