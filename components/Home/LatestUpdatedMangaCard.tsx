import { Daum } from "@/types/mangaDexApi.interface";
import {
  AspectRatio,
  Badge,
  Box,
  chakra,
  Divider,
  GridItem,
  Link as ChakraLink,
  Stack,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  manga: Daum;
}

const LatestUpdatedMangaCard: FC<Props> = ({ manga }) => {
  const getCoverArt = manga.relationships.filter((m) => m.type === "cover_art");

  const isCoverArtExists = getCoverArt.length > 0;

  const CoverImg = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["alt", "src", "layout", "objectFit", "quality"].includes(prop),
  });

  const renderBadge = (status: string) => {
    if (status === "ongoing") {
      return <Badge colorScheme="orange">{status}</Badge>;
    }

    if (status === "completed") {
      return <Badge colorScheme="green">{status}</Badge>;
    }

    if (status === "hiatus") {
      return <Badge colorScheme="yellow">{status}</Badge>;
    }

    if (status === "cancelled") {
      return <Badge colorScheme="red">{status}</Badge>;
    }
  };

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
            {isCoverArtExists && (
              <AspectRatio ratio={640 / 1005}>
                <CoverImg
                  roundedTop="md"
                  layout="fill"
                  objectFit="cover"
                  alt={`Cover for ${manga.attributes.title.en}`}
                  src={`https://uploads.mangadex.org/covers/${manga.id}/${getCoverArt[0].attributes?.fileName}`}
                  quality={100}
                />
              </AspectRatio>
            )}
            {manga.attributes.status && (
              <Box top={0} right={0} m={2} position="absolute">
                {renderBadge(manga.attributes.status)}
              </Box>
            )}
          </Box>

          <Box p={4} textAlign="left">
            <Stack height="full">
              <Text fontWeight="bold" noOfLines={1} fontSize="lg">
                {manga.attributes.title.en}{" "}
                {manga.attributes.year && `(${manga.attributes.year})`}
              </Text>
              {manga.attributes.description.en ? (
                <Text noOfLines={2}>{manga.attributes.description.en}</Text>
              ) : (
                <Text>No description available...</Text>
              )}
            </Stack>
            <Divider my={4} />
            <Wrap>
              {manga.attributes.tags.map((tag) => (
                <WrapItem key={tag.id}>
                  <Badge colorScheme={"blue"}>{tag.attributes.name.en}</Badge>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </ChakraLink>
      </Link>
    </GridItem>
  );
};

export default LatestUpdatedMangaCard;
