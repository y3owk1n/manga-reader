import { UpdatedComicSwrRes } from "@/types/swrResponse.interface";
import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";
import LatestUpdatedMangaCard from "./LatestUpdatedMangaCard";

interface Props {
  headerText: string;
  gridColumnsArray?: (number | null)[];
  data: UpdatedComicSwrRes | undefined;
  chapterError: Error | undefined;
}

const MangaGridContainer: FC<Props> = ({
  data,
  headerText,
  gridColumnsArray = [2, null, 4, 6],
  chapterError,
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
      </Stack>
    </Box>
  );
};

export default MangaGridContainer;
