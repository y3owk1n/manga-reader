import MangaGridContainer from "@/components/Home/MangaGridContainer";
import Layout from "@/components/Shared/Layout";
import { UpdatedComicSwrRes } from "@/types/swrResponse.interface";
import { fetchGetJSON } from "@/utils/apiHelper";
import { Container, Stack } from "@chakra-ui/react";
import { useQueryState } from "next-usequerystate";
import React, { useState } from "react";
import useSWR from "swr";

const Latest = () => {
  const [comicType, setComicType] = useState(100);
  const [comicPage, setComicPage] = useQueryState("page", {
    history: "push",
    parse: (query: string) => parseInt(query),
    defaultValue: 1,
  });

  const { data: chapterData, error: chapterError } = useSWR<
    UpdatedComicSwrRes,
    Error
  >(`/api/comic-list?page=${comicPage}&type=${comicType}`, fetchGetJSON);

  return (
    <Layout>
      <Container maxW="container.xl" my={6}>
        <Stack spacing={6}>
          <MangaGridContainer
            headerText={"最新更新"}
            data={chapterData}
            chapterError={chapterError}
            setComicPage={setComicPage}
            comicPage={comicPage}
          />
        </Stack>
      </Container>
    </Layout>
  );
};

export default Latest;
