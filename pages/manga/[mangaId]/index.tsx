import MangaDetailContainer from "@/components/MangaDetail/MangaDetailContainer";
import Layout from "@/components/Shared/Layout";
import { MangaDetailSwrRes } from "@/types/swrResponse.interface";
import { fetchGetJSON } from "@/utils/apiHelper";
import { Center, Container, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import useSWR from "swr";

interface Props {}

const MangaDetail: FC<Props> = ({}) => {
  const router = useRouter();

  const { mangaId } = router.query;

  const { data: mangaDetailData, error: mangaDetailError } = useSWR<
    MangaDetailSwrRes,
    Error
  >(`/api/comic-detail?id=${mangaId}`, fetchGetJSON);

  if (!mangaDetailData) {
    return (
      <Layout>
        <Container maxW="container.xl" my={6}>
          <Center>
            <Spinner />
          </Center>
        </Container>
      </Layout>
    );
  }

  const { data } = mangaDetailData;

  if (mangaDetailError) {
    return (
      <Layout>
        <Container maxW="container.xl" my={6}>
          <Text>{mangaDetailError.message}</Text>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxW="container.xl" my={6}>
        <MangaDetailContainer data={data} />
      </Container>
    </Layout>
  );
};

export default MangaDetail;
