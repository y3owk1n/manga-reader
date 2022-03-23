import { MangaDetailInfo } from "@/types/dmzj.interface";
import { replaceToMuwai } from "@/utils/replaceToMuwai";
import useLocalStorage from "@/utils/useLocalStorage";
import {
  Badge,
  Box,
  Button,
  GridItem,
  Heading,
  HStack,
  Image as ChakraImage,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { FC } from "react";
import { BsCheckCircleFill, BsFillBookmarkFill } from "react-icons/bs";
import LazyLoad from "react-lazyload";
import { LocalStorageChapterProgressProp } from "../Chapter/ChapterContainer";

interface Props {
  mangaDetail: MangaDetailInfo;
}

export interface LocalStorageFavouriteProp {
  id: string;
  title: string;
  cover: string;
}

const MangaDetailInfo: FC<Props> = ({ mangaDetail }) => {
  const [favourite, setFavourite] = useLocalStorage<
    LocalStorageFavouriteProp[]
  >("favourite", []);

  const [chapterProgress, setChapterProgress] = useLocalStorage<
    LocalStorageChapterProgressProp[]
  >("progress", []);

  const handleAddToFavourite = () => {
    const toFavourite: LocalStorageFavouriteProp = {
      id: mangaDetail.id,
      title: mangaDetail.title,
      cover: replaceToMuwai(mangaDetail.cover),
    };

    const favouriteExist = favourite.some((fav) => fav.id === mangaDetail.id);

    if (favouriteExist) {
      const newFavourite: LocalStorageFavouriteProp[] = favourite.filter(
        (fav) => fav.id !== mangaDetail.id
      );
      setFavourite(newFavourite);
    } else {
      const newFavourite: LocalStorageFavouriteProp[] = [
        ...favourite,
        toFavourite,
      ];
      setFavourite(newFavourite);
    }
  };

  const matchedChapterProgress = chapterProgress.filter(
    (pc) => pc.comicId === Number(mangaDetail.id)
  )[0];

  return (
    <SimpleGrid columns={[6, null, 6, 8]} spacing={4}>
      <GridItem colSpan={[2, null, 2, 2]}>
        <Box position="relative">
          <LazyLoad>
            <ChakraImage
              loading={"lazy"}
              rounded="md"
              objectFit="cover"
              alt={`Cover for ${mangaDetail.title}`}
              src={replaceToMuwai(mangaDetail.cover)}
              bgColor="gray.100"
            />
          </LazyLoad>
        </Box>
      </GridItem>
      <GridItem colSpan={[4, null, 4, 6]}>
        <Stack spacing={4}>
          <Heading fontWeight="bold" fontSize="2xl">
            {mangaDetail.title}
          </Heading>
          <Wrap align={"center"}>
            <WrapItem>
              <Text>题材: </Text>
            </WrapItem>
            <Badge colorScheme={"blue"}>{mangaDetail.types}</Badge>
          </Wrap>
          <Text fontSize={{ base: "sm", md: "md" }}>
            {mangaDetail.description}
          </Text>
          {chapterProgress.some(
            (progressChap) => progressChap.comicId === Number(mangaDetail.id)
          ) && (
            <HStack>
              <Text>最后阅读：</Text>
              <NextLink
                href={`/manga/${matchedChapterProgress.comicId}/${matchedChapterProgress.chapterId}`}
                passHref
              >
                <Link color="blue.500">
                  {matchedChapterProgress.chapterName}
                </Link>
              </NextLink>
            </HStack>
          )}
          <Box>
            <Button
              variant="outline"
              colorScheme={"blue"}
              onClick={handleAddToFavourite}
              leftIcon={
                favourite.some((f) => f.id === mangaDetail.id) ? (
                  <BsCheckCircleFill />
                ) : (
                  <BsFillBookmarkFill />
                )
              }
            >
              {favourite.some((fav) => fav.id === mangaDetail.id)
                ? "已收藏"
                : "收藏"}
            </Button>
          </Box>
        </Stack>
      </GridItem>
    </SimpleGrid>
  );
};

export default MangaDetailInfo;
