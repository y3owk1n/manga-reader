import LatestUpdatedMangaCard from "@/components/Home/LatestUpdatedMangaCard";
import MangaGridContainer from "@/components/Home/MangaGridContainer";
import SearchBarContainer from "@/components/Home/SearchBarContainer";
import Layout from "@/components/Shared/Layout";
import { MangaList } from "@/types/mangaDexApi.interface";
import { fetchGetJSON } from "@/utils/apiHelper";
import { Stack } from "@chakra-ui/react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

const Home = ({
  mangaList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Stack spacing={10}>
        <SearchBarContainer />
        <MangaGridContainer headerText="Latest Updated Mangas">
          {mangaList.data.map((manga) => (
            <LatestUpdatedMangaCard key={manga.id} manga={manga} />
          ))}
        </MangaGridContainer>
      </Stack>
    </Layout>
  );
};

export default Home;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const mangaList: MangaList = await fetchGetJSON(
    "https://api.mangadex.org/manga?includes[]=cover_art&order[updatedAt]=desc"
  );

  return {
    props: {
      mangaList,
    },
    revalidate: 60,
  };
};
