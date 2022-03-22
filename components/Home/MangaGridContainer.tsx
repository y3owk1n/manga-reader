import { UpdatedComicSwrRes } from "@/types/swrResponse.interface";
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { TransitionOptions } from "next-usequerystate";
import React, { FC } from "react";
import LatestUpdatedMangaCard from "./LatestUpdatedMangaCard";

interface Props {
  headerText: string;
  gridColumnsArray?: (number | null)[];
  data: UpdatedComicSwrRes | undefined;
  chapterError: Error | undefined;
  setComicPage: (
    value: number | ((old: number) => number | null) | null,
    transitionOptions?: TransitionOptions | undefined
  ) => Promise<boolean>;
  comicPage: number;
}

const MangaGridContainer: FC<Props> = ({
  data,
  headerText,
  gridColumnsArray = [2, null, 4, 6],
  chapterError,
  setComicPage,
  comicPage,
}) => {
  if (!data) {
    return (
      <Box>
        <Center>
          <Spinner />
        </Center>
      </Box>
    );
  }

  const { data: comicData } = data;

  if (chapterError) {
    return (
      <Box>
        <Text>{chapterError.message}</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Stack spacing={4}>
        <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }}>
          {headerText}
        </Heading>

        <SimpleGrid columns={gridColumnsArray} spacing={4} w="full">
          {comicData.map((comic) => (
            <LatestUpdatedMangaCard key={comic.comidId} comic={comic} />
          ))}
        </SimpleGrid>
        <HStack>
          <Button
            disabled={comicPage <= 1}
            colorScheme="blue"
            onClick={() => setComicPage((prev) => prev - 1)}
          >
            上一页
          </Button>
          <Button
            colorScheme="blue"
            disabled={comicData.length < 20}
            onClick={() => setComicPage((prev) => prev + 1)}
          >
            下一页
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
};

export default MangaGridContainer;
