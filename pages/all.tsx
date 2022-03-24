import CategoryList from "@/components/Category/CategoryList";
import CategoryListGridContainer from "@/components/Category/CategoryListGridContainer";
import Layout from "@/components/Shared/Layout";
import {
  CategorySwrRes,
  ComicByCategorySwrRes,
} from "@/types/swrResponse.interface";
import { fetchGetJSON } from "@/utils/apiHelper";
import {
  Button,
  chakra,
  Container,
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQueryState } from "next-usequerystate";
import React from "react";
import useSWR from "swr";

const All = () => {
  const [theme, setTheme] = useQueryState("题材", {
    history: "push",
    parse: (query: string) => parseInt(query),
    defaultValue: 0,
  });
  const [audience, setAudience] = useQueryState("读者群", {
    history: "push",
    parse: (query: string) => parseInt(query),
    defaultValue: 0,
  });
  const [status, setStatus] = useQueryState("进度", {
    history: "push",
    parse: (query: string) => parseInt(query),
    defaultValue: 2309,
  });
  const [location, setLocation] = useQueryState("地域", {
    history: "push",
    parse: (query: string) => parseInt(query),
    defaultValue: 2304,
  });
  const [popularOrLatest, setPopularOrLatest] = useQueryState(
    "popularOrLatest",
    {
      history: "push",
      parse: (query: string) => parseInt(query),
      defaultValue: 0, // 0 for popular; 1 for latest
    }
  );

  const [comicPage, setComicPage] = useQueryState("page", {
    history: "push",
    parse: (query: string) => parseInt(query),
    defaultValue: 1,
  });

  const ListBgColor = useColorModeValue("gray.100", "gray.700");

  const { data: categoryData, error: categoryError } = useSWR<
    CategorySwrRes,
    Error
  >(`/api/category`, fetchGetJSON);

  const { data: comicByCategoryData, error: comicByCategoryError } = useSWR<
    ComicByCategorySwrRes,
    Error
  >(
    theme >= 0 &&
      audience >= 0 &&
      status >= 0 &&
      location >= 0 &&
      popularOrLatest >= 0 &&
      comicPage >= 0
      ? `/api/comic-by-category?题材=${theme}&读者群=${audience}&进度=${status}&地域=${location}&popularOrLatest=${popularOrLatest}&page=${
          comicPage - 1
        }`
      : null,
    fetchGetJSON
  );

  return (
    <Layout>
      <Container maxW="container.xl" my={6}>
        <SimpleGrid columns={[1, null, 6, 6]} spacing={4} pos="relative">
          <GridItem
            colSpan={[1, null, 2, 2]}
            p={4}
            bgColor={ListBgColor}
            rounded="md"
            h="fit-content"
            position={["relative", null, "sticky", "sticky"]}
            top={[0, null, "80px", "80px"]}
          >
            <CategoryList
              categoryData={categoryData}
              categoryError={categoryError}
              theme={theme}
              setTheme={setTheme}
              audience={audience}
              setAudience={setAudience}
              status={status}
              setStatus={setStatus}
              location={location}
              setLocation={setLocation}
            />
          </GridItem>
          <GridItem colSpan={[1, null, 4, 4]}>
            <Stack>
              <HStack>
                <Button
                  variant="link"
                  fontWeight={popularOrLatest === 0 ? "bold" : "normal"}
                  colorScheme={popularOrLatest === 0 ? "blue" : "gray"}
                  onClick={() => setPopularOrLatest(0)}
                >
                  人气
                </Button>
                <chakra.span>|</chakra.span>
                <Button
                  variant="link"
                  fontWeight={popularOrLatest === 1 ? "bold" : "normal"}
                  colorScheme={popularOrLatest === 1 ? "blue" : "gray"}
                  onClick={() => setPopularOrLatest(1)}
                >
                  更新
                </Button>
              </HStack>
              <CategoryListGridContainer
                data={comicByCategoryData}
                chapterError={comicByCategoryError}
                setComicPage={setComicPage}
                comicPage={comicPage}
              />
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export default All;
