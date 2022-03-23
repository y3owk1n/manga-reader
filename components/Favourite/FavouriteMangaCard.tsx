import { replaceToMuwai } from "@/utils/replaceToMuwai";
import {
  AspectRatio,
  Box,
  GridItem,
  Image as ChakraImage,
  Link as ChakraLink,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";
import LazyLoad from "react-lazyload";
import { LocalStorageFavouriteProp } from "../MangaDetail/MangaDetailInfo";

interface Props {
  comic: LocalStorageFavouriteProp;
}

const FavouriteMangaCard: FC<Props> = ({ comic }) => {
  return (
    <GridItem
      bg={useColorModeValue("white", "gray.800")}
      rounded="md"
      border="1px solid rgba(0, 0, 0, 0.15)"
      transition="all 0.2s"
      _hover={{
        shadow: "lg",
        transform: "translateY(-5px)",
      }}
    >
      <Link href={`/manga/${comic.id}`} passHref>
        <ChakraLink _hover={{ textDecor: "none" }}>
          <Box position="relative">
            <LazyLoad>
              <AspectRatio ratio={270 / 360}>
                <ChakraImage
                  loading={"lazy"}
                  roundedTop="md"
                  objectFit="cover"
                  alt={`Cover for ${comic.title}`}
                  src={replaceToMuwai(comic.cover)}
                  w="full"
                />
              </AspectRatio>
            </LazyLoad>
          </Box>

          <Box p={4} textAlign="left">
            <Stack height="full">
              <Text fontSize="sm" fontWeight="bold" noOfLines={1}>
                {comic.title}
              </Text>
            </Stack>
          </Box>
        </ChakraLink>
      </Link>
    </GridItem>
  );
};

export default FavouriteMangaCard;
