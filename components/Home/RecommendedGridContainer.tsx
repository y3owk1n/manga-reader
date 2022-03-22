import { RecommendedSwrRes } from "@/types/swrResponse.interface";
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
import RecommendedMangaCard from "./RecommendedMangaCard";

interface Props {
  gridColumnsArray?: (number | null)[];
  recommendedData: RecommendedSwrRes | undefined;
  recommendedError: Error | undefined;
}

const RecommendedGridContainer: FC<Props> = ({
  recommendedData,
  gridColumnsArray = [2, null, 4, 5],
  recommendedError,
}) => {
  if (recommendedError) {
    return (
      <Box>
        <Text>{recommendedError.message}</Text>
      </Box>
    );
  }

  if (!recommendedData) {
    return (
      <Box>
        <Center>
          <Spinner />
        </Center>
      </Box>
    );
  }

  const { data } = recommendedData;

  return (
    <Box>
      <Stack spacing={6}>
        {data.map((cat) => (
          <Stack key={cat.category_id} spacing={4}>
            <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }}>
              {cat.title}
            </Heading>

            <SimpleGrid columns={gridColumnsArray} spacing={4} w="full">
              {cat.data.map((comic) => (
                <RecommendedMangaCard key={comic.obj_id} comic={comic} />
              ))}
            </SimpleGrid>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default RecommendedGridContainer;
