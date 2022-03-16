import { Daum } from "@/types/mangaDexApi.interface";
import {
  AspectRatio,
  Badge,
  Box,
  chakra,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { FC } from "react";

interface Props {
  mangaDetail: Daum;
}

const MangaDetailInfo: FC<Props> = ({ mangaDetail }) => {
  const getCoverArt = mangaDetail.relationships.filter(
    (m) => m.type === "cover_art"
  );

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
    <SimpleGrid columns={[2, null, 6, 8]} spacing={4}>
      <GridItem colSpan={[2, null, 2, 2]}>
        <Box position="relative">
          {isCoverArtExists && (
            <AspectRatio ratio={640 / 1005}>
              <CoverImg
                rounded="md"
                layout="fill"
                objectFit="cover"
                alt={`Cover for ${mangaDetail.attributes.title.en}`}
                src={`https://uploads.mangadex.org/covers/${mangaDetail.id}/${getCoverArt[0].attributes?.fileName}`}
                quality={100}
              />
            </AspectRatio>
          )}
          {mangaDetail.attributes.status && (
            <Box top={0} right={0} m={2} position="absolute">
              {renderBadge(mangaDetail.attributes.status)}
            </Box>
          )}
        </Box>
      </GridItem>
      <GridItem colSpan={[2, null, 4, 6]}>
        <Stack spacing={4}>
          <Heading fontWeight="bold" fontSize="2xl">
            {mangaDetail.attributes.title.en}{" "}
            {mangaDetail.attributes.year && `(${mangaDetail.attributes.year})`}
          </Heading>
          <Wrap>
            {mangaDetail.attributes.tags.map((tag) => (
              <WrapItem key={tag.id}>
                <Badge colorScheme={"blue"}>{tag.attributes.name.en}</Badge>
              </WrapItem>
            ))}
          </Wrap>
          {mangaDetail.attributes.description.en ? (
            <Text>{mangaDetail.attributes.description.en}</Text>
          ) : (
            <Text>No description available...</Text>
          )}
        </Stack>
      </GridItem>
    </SimpleGrid>
  );
};

export default MangaDetailInfo;
