import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { LocalStorageFavouriteProp } from "../MangaDetail/MangaDetailInfo";
import FavouriteMangaCard from "./FavouriteMangaCard";

interface Props {
  headerText: string;
  gridColumnsArray?: (number | null)[];
  comicData: LocalStorageFavouriteProp[];
}

const FavouriteMangaContainer: FC<Props> = ({
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
        <Text>总共{comicData.length}个漫画</Text>

        <SimpleGrid columns={gridColumnsArray} spacing={4} w="full">
          {comicData.map((comic) => (
            <FavouriteMangaCard key={comic.id} comic={comic} />
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default FavouriteMangaContainer;
