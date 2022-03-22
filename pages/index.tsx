import Banner from "@/components/Home/Banner";
import MangaGridContainer from "@/components/Home/MangaGridContainer";
import Layout from "@/components/Shared/Layout";
import { UpdatedComicSwrRes } from "@/types/swrResponse.interface";
import { fetchGetJSON } from "@/utils/apiHelper";
import { Container, Heading, Stack } from "@chakra-ui/react";
import { useQueryState } from "next-usequerystate";
import { useState } from "react";
import useSWR from "swr";

const Home = () => {
  const [comicType, setComicType] = useState(100);
  const [comicPage, setComicPage] = useQueryState("page", {
    history: "push",
    parse: (query: string) => parseInt(query),
    defaultValue: 1,
  });

  const { data: chapterData, error: chapterError } = useSWR<
    UpdatedComicSwrRes,
    Error
  >(`/api/comic-list?page=${comicPage - 1}&type=${comicType}`, fetchGetJSON);

  return (
    <Layout>
      <Container maxW="container.xl" my={6}>
        <Stack spacing={6}>
          <Banner>
            <Heading as="h1" color="white">
              我爱漫画，漫画爱我
            </Heading>
          </Banner>
          <MangaGridContainer
            headerText={"最新更新"}
            data={chapterData}
            chapterError={chapterError}
          />
        </Stack>
      </Container>
    </Layout>
  );
};

export default Home;
