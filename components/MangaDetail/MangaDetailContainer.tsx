import { MangaDetailData } from "@/types/dmzj.interface";
import useLocalStorage from "@/utils/useLocalStorage";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Button,
  chakra,
  HStack,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { LocalStorageChapterProgressProp } from "../Chapter/ChapterContainer";
import MangaGridContainerWithoutSwr from "../Home/MangaGridContainerWithoutSwr";
import MangaDetailInfo from "./MangaDetailInfo";

interface Props {
  data: MangaDetailData;
}

const rowToShow = 5;

const MangaDetailContainer: FC<Props> = ({ data }) => {
  const dataLength = data.list.length;

  const [chapterProgress, setChapterProgress] = useLocalStorage<
    LocalStorageChapterProgressProp[]
  >("progress", []);

  const responsiveColumns = useBreakpointValue({ base: 2, lg: 3, xl: 4 });
  const totalItemsToShow = responsiveColumns! * rowToShow;

  const [arrayLength, setArrayLength] = useState(0);

  const [showAllChapters, setShowAllChapters] = useState(false);

  useEffect(() => {
    if (showAllChapters) {
      setArrayLength(dataLength);
    } else {
      if (dataLength >= totalItemsToShow) {
        setArrayLength(totalItemsToShow);
        return;
      } else {
        setArrayLength(dataLength);
        return;
      }
    }
  }, [dataLength, responsiveColumns, showAllChapters, totalItemsToShow]);

  return (
    <Stack spacing={6}>
      <MangaDetailInfo mangaDetail={data.info} />

      <Stack bgColor="gray.50" rounded="lg" p={6}>
        <SimpleGrid columns={responsiveColumns} spacing={4}>
          {data.list
            .sort((a, b) => Number(b.chapter_order) - Number(a.chapter_order))
            .slice(0, arrayLength)
            .map((chap) => (
              <Link
                href={`/manga/${chap.comic_id}/${chap.id}`}
                key={chap.id}
                passHref
              >
                <ChakraLink _hover={{ textDecor: "none" }}>
                  <Button
                    variant={"outline"}
                    size="md"
                    // as={"a"}
                    w="full"
                    fontWeight={"normal"}
                    colorScheme={"blue"}
                    fontSize="sm"
                    noOfLines={1}
                  >
                    <HStack>
                      {chapterProgress.some(
                        (progressChap) =>
                          progressChap.comicId === Number(chap.comic_id) &&
                          progressChap.chapterId === Number(chap.id)
                      ) && <AiFillEye />}
                      <chakra.span>{chap.chapter_name}</chakra.span>
                    </HStack>
                  </Button>
                </ChakraLink>
              </Link>
            ))}
        </SimpleGrid>
        {dataLength > totalItemsToShow && (
          <Stack align="center" pt={4}>
            <Button
              variant={"link"}
              _hover={{ textDecor: "none" }}
              colorScheme="blue"
              fontWeight={"normal"}
              rightIcon={
                showAllChapters ? <ChevronUpIcon /> : <ChevronDownIcon />
              }
              onClick={() => setShowAllChapters(!showAllChapters)}
            >
              {showAllChapters ? "收起" : "查看所有章节"}
            </Button>
          </Stack>
        )}
      </Stack>

      <MangaGridContainerWithoutSwr
        headerText={"你可能也想看  "}
        comicData={data.similar}
      />
    </Stack>
  );
};

export default MangaDetailContainer;
