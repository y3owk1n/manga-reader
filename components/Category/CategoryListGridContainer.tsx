import { ComicByCategorySwrRes } from "@/types/swrResponse.interface";
import {
  Box,
  Button,
  Center,
  HStack,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { TransitionOptions } from "next-usequerystate";
import React, { FC } from "react";
import CategoryListCard from "./CategoryListCard";

interface Props {
  gridColumnsArray?: (number | null)[];
  data: ComicByCategorySwrRes | undefined;
  chapterError: Error | undefined;
  setComicPage: (
    value: number | ((old: number) => number | null) | null,
    transitionOptions?: TransitionOptions | undefined
  ) => Promise<boolean>;
  comicPage: number;
}

const CategoryListGridContainer: FC<Props> = ({
  data,
  gridColumnsArray = [2, null, 3, 4],
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
        <SimpleGrid columns={gridColumnsArray} spacing={4} w="full">
          {comicData.map((comic) => (
            <CategoryListCard key={comic.id} comic={comic} />
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
            disabled={comicData.length < 15}
            onClick={() => setComicPage((prev) => prev + 1)}
          >
            下一页
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
};

export default CategoryListGridContainer;
