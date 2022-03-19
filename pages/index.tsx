import Banner from "@/components/Home/Banner";
import LatestUpdatedMangaCard from "@/components/Home/LatestUpdatedMangaCard";
import MangaGridContainer from "@/components/Home/MangaGridContainer";
import PopularMangaListContainer from "@/components/Home/PopularMangaListContainer";
import Layout from "@/components/Shared/Layout";
import { fetchGetHtml } from "@/utils/apiHelper";
import {
  Container,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import * as cheerio from "cheerio";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

const Home = ({
  recommendedMangaData,
  recentMangaData,
  popularMangaData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Container maxW="container.xl" my={6}>
        <Stack spacing={6}>
          <Banner>
            <Heading as="h1" color="white">
              我爱漫画，漫画爱我
            </Heading>
          </Banner>
          <MangaGridContainer headerText={recommendedMangaData.title}>
            {recommendedMangaData.item.map((m) => (
              <LatestUpdatedMangaCard key={m.id} manga={m} />
            ))}
          </MangaGridContainer>
          <SimpleGrid columns={[1, null, 6, 10]} spacing={10}>
            <GridItem colSpan={[1, null, 2, 3]}>
              <PopularMangaListContainer popularList={popularMangaData} />
            </GridItem>
            <GridItem colSpan={[1, null, 4, 7]}>
              <MangaGridContainer
                gridColumnsArray={[2, null, 3, 3]}
                headerText={recentMangaData.title}
              >
                {recentMangaData.item.map((m) => (
                  <LatestUpdatedMangaCard key={m.id} manga={m} />
                ))}
              </MangaGridContainer>
            </GridItem>
          </SimpleGrid>
        </Stack>
      </Container>
    </Layout>
  );
};

export default Home;

export interface MangaContainer {
  title: string;
  item: MangaItem[];
}

export interface MangaItem {
  id: string;
  coverImg: string;
  title: string;
  latestEpisode: string;
  description: string;
}

export interface PopularMangaContainer {
  title: string;
  item: PopularMangaList[];
}

export interface PopularMangaList {
  id: string;
  rank: string;
  title: string;
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const haoman6HomeHtml = await fetchGetHtml("https://www.haoman6.com");

  const $ = cheerio.load(haoman6HomeHtml);

  const recommendedManga = $(".in-sec-wr .in-sec-wr");

  const recommendedMangaTitle = recommendedManga.find("span").text();

  const recommendedMangaItem: MangaItem[] = [];

  recommendedManga.find(".cs-item").each((i, elem) => {
    const manga = $(elem);
    const mangaUrl = manga.find("a").attr("href") as string;
    const mangaId = mangaUrl.split("/")[2];
    const mangaLatestEpisode = manga.find(".cover__tag").text();
    const mangaTitle = manga.find(".comic__title").text();
    const mangaDescription = manga.find(".comic__feature").text();
    const mangaCoverImg = manga.find("img").attr("data-original") as string;
    const mangaCoverImgWithHttps = mangaCoverImg.replace(
      /^http:\/\//i,
      "https://"
    );

    recommendedMangaItem[i] = {
      id: mangaId,
      coverImg: mangaCoverImgWithHttps,
      title: mangaTitle,
      description: mangaDescription,
      latestEpisode: mangaLatestEpisode,
    };
  });

  const recommendedMangaData: MangaContainer = {
    title: recommendedMangaTitle,
    item: recommendedMangaItem,
  };

  const recentManga = $(".recent-wr .in-sec-update");

  const recentMangaTitle = recentManga.find(".in-sec__head span").text();

  const recentMangaItem: MangaItem[] = [];

  recentManga.find(".in-comic--type-b").each((i, elem) => {
    const manga = $(elem);
    const mangaUrl = manga.find("a").attr("href") as string;
    const mangaId = mangaUrl.split("/")[2];
    const mangaLatestEpisode = manga.find(".cover__tag").text();
    const mangaTitle = manga.find(".comic__title").text();
    const mangaDescription = manga.find(".comic__feature").text();
    const mangaCoverImg = manga.find("img").attr("data-original") as string;
    const mangaCoverImgWithHttps = mangaCoverImg.replace(
      /^http:\/\//i,
      "https://"
    );

    recentMangaItem[i] = {
      id: mangaId,
      coverImg: mangaCoverImgWithHttps,
      title: mangaTitle,
      description: mangaDescription,
      latestEpisode: mangaLatestEpisode,
    };
  });

  const recentMangaData: MangaContainer = {
    title: recentMangaTitle,
    item: recentMangaItem,
  };

  const popularManga = $(".in-rank-box--aside");

  const popularMangaTitle = popularManga.find(".in-sec__head span").text();

  const popularMangaItem: PopularMangaList[] = [];

  popularManga.find(".rank-list .rank-item").each((i, elem) => {
    const manga = $(elem);
    const mangaRank = manga.find(".num").text();
    const mangaUrl = manga.find("a").attr("href") as string;
    const mangaId = mangaUrl.split("/")[2];
    const mangaTitle = manga.find("a").text();

    popularMangaItem[i] = {
      id: mangaId,
      rank: mangaRank,
      title: mangaTitle,
    };
  });

  const popularMangaData: PopularMangaContainer = {
    title: popularMangaTitle,
    item: popularMangaItem,
  };

  return {
    props: {
      recommendedMangaData,
      recentMangaData,
      popularMangaData,
    },
    revalidate: 60,
  };
};
