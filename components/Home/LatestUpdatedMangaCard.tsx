import {
  AspectRatio,
  Badge,
  Box,
  GridItem,
  HStack,
  Image as ChakraImage,
  Link as ChakraLink,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { MangaItem } from "pages";
import React, { FC } from "react";
import LazyLoad from "react-lazyload";

interface Props {
  manga: MangaItem;
}

const LatestUpdatedMangaCard: FC<Props> = ({ manga }) => {
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
      <Link href={`/manga/${manga.id}`} passHref>
        <ChakraLink _hover={{ textDecor: "none" }}>
          <Box position="relative">
            <AspectRatio ratio={320 / 424} rounded="md" bgColor="gray.100">
              <LazyLoad>
                <ChakraImage
                  loading={"lazy"}
                  roundedTop="md"
                  objectFit="cover"
                  alt={`Cover for ${manga.title}`}
                  src={manga.coverImg}
                />
              </LazyLoad>
            </AspectRatio>
            <HStack bottom={0} left={0} m={2} position="absolute">
              <Badge colorScheme={"blue"}>{manga.latestEpisode}</Badge>
            </HStack>
          </Box>

          <Box p={4} textAlign="left">
            <Stack height="full">
              <Text fontSize="sm" fontWeight="bold" noOfLines={1}>
                {manga.title}
              </Text>
              <Text fontSize="sm" color="gray.500" noOfLines={1}>
                {manga.description}
              </Text>
            </Stack>
          </Box>
        </ChakraLink>
      </Link>
    </GridItem>
  );
};

export default LatestUpdatedMangaCard;
