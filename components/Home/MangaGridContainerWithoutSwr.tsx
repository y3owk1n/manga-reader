import { MangaDetailSimilarList } from "@/types/dmzj.interface";
import { Box, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import React, { FC } from "react";
import LatestUpdatedMangaCardWithoutSwr from "./LatestUpdatedMangaCardWithoutSwr";

interface Props {
  headerText: string;
  gridColumnsArray?: (number | null)[];
  comicData: MangaDetailSimilarList[];
}

const MangaGridContainerWithoutSwr: FC<Props> = ({
  headerText,
  gridColumnsArray = [2, null, 4, 6],
  comicData,
}) => {
  return (
    <Box>
      <Stack spacing={4}>
        <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }}>
          {headerText}
        </Heading>

        <SimpleGrid columns={gridColumnsArray} spacing={4} w="full">
          {comicData.map((comic) => (
            <LatestUpdatedMangaCardWithoutSwr key={comic.id} comic={comic} />
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default MangaGridContainerWithoutSwr;
