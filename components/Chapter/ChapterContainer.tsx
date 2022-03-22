import { MangaChapterData } from "@/types/dmzj.interface";
import useLocalStorage from "@/utils/useLocalStorage";
import { Box, Container, Stack, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useRef, useState } from "react";
import BreadcrumbChapter from "./BreadcrumbChapter";
import ChapterImagesContainer from "./ChapterImagesContainer";
import Pagination from "./Pagination";

interface Props {
  chapterData: MangaChapterData;
}

export interface LocalStorageChapterProgressProp {
  comicId: number;
  chapterId: number;
  chapterName: string;
}

const ChapterContainer: FC<Props> = ({ chapterData }) => {
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [chapterProgress, setChapterProgress] = useLocalStorage<
    LocalStorageChapterProgressProp[]
  >("progress", []);

  useEffect(() => {
    const toChapterProgress: LocalStorageChapterProgressProp = {
      comicId: chapterData.comic_id,
      chapterId: chapterData.id,
      chapterName: chapterData.chapter_name,
    };

    const comicExists = chapterProgress.some(
      (chap) => chap.comicId === chapterData.comic_id
    );

    if (comicExists) {
      const newChapterProgress: LocalStorageChapterProgressProp[] =
        chapterProgress.filter((chap) => chap.comicId !== chapterData.comic_id);
      const finalChapterProgress: LocalStorageChapterProgressProp[] = [
        ...newChapterProgress,
        toChapterProgress,
      ];
      setChapterProgress(finalChapterProgress);
    } else {
      const newChapterProgress: LocalStorageChapterProgressProp[] = [
        ...chapterProgress,
        toChapterProgress,
      ];
      setChapterProgress(newChapterProgress);
    }
  }, []);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, chapterData.page_url.length);
  }, [chapterData.page_url]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window !== undefined &&
        itemsRef.current.filter((item) => item === null).length === 0
      ) {
        const currentHeight = window.scrollY + window.innerHeight;

        const items = itemsRef.current.filter((item, index) => {
          return currentHeight <= item.offsetTop + item.clientHeight;
        });

        setCurrentPage(
          items.length <= 0
            ? chapterData.page_url.length
            : chapterData.page_url.length - items.length + 1
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [chapterData.page_url.length]);

  return (
    <>
      <BreadcrumbChapter
        comicId={chapterData.comic_id}
        chapterTitle={chapterData.chapter_name}
        currentPage={currentPage}
        totalPages={chapterData.page_url.length}
      />
      <Container maxW="container.xl" my={6}>
        <Stack spacing={6} align="center" maxW="800px" mx="auto">
          <Stack>
            <Box w="full">
              {chapterData.page_url.map((image, i) => (
                <ChapterImagesContainer
                  key={i}
                  image={image}
                  page={(i + 1).toString()}
                  itemsRef={itemsRef}
                />
              ))}
            </Box>
          </Stack>
          <Pagination
            prevChapterId={chapterData.prev_chap_id}
            nextChapterId={chapterData.next_chap_id}
            comicId={chapterData.comic_id}
          >
            {chapterData.page_url.length > 0 && <Text>已是最后一页</Text>}
          </Pagination>
        </Stack>
      </Container>
    </>
  );
};

export default ChapterContainer;
