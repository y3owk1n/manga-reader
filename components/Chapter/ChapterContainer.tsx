import BreadcrumbChapter from "@/components/Chapter/BreadcrumbChapter";
import Pagination from "@/components/Chapter/Pagination";
import {
  ChapterDetails,
  ChapterImages,
  PrevNextChapter,
} from "@/types/manga.interface";
import { Box, Container, Stack, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useRef, useState } from "react";
import ChapterImagesContainer from "./ChapterImagesContainer";

interface Props {
  chapterDetails: ChapterDetails;
  chapterImages: ChapterImages[];
  prevNextChapterData: PrevNextChapter;
}

const ChapterContainer: FC<Props> = ({
  chapterDetails,
  chapterImages,
  prevNextChapterData,
}) => {
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, chapterImages.length);
  }, [chapterImages]);

  useEffect(() => {
    const handleScroll = () => {
      if (window !== undefined || itemsRef.current.length <= 0) {
        const currentHeight = window.scrollY + window.innerHeight;

        const items = itemsRef.current.filter((item, index) => {
          return currentHeight <= item.offsetTop + item.clientHeight;
        });

        setCurrentPage(
          items.length <= 0
            ? chapterImages.length
            : chapterImages.length - items.length + 1
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [chapterImages]);

  return (
    <>
      <BreadcrumbChapter
        chapterDetails={chapterDetails}
        currentPage={currentPage}
        totalPages={chapterImages.length}
      />
      <Container maxW="container.xl" my={6}>
        <Stack align="center" maxW="800px" mx="auto">
          <Box w="full">
            {chapterImages.map(({ image, page }) => (
              <ChapterImagesContainer
                image={image}
                page={page}
                itemsRef={itemsRef}
                key={page}
              />
            ))}
          </Box>
          <Pagination prevNextChapterData={prevNextChapterData}>
            {chapterImages.length > 0 && <Text>已是最后一页</Text>}
          </Pagination>
        </Stack>
      </Container>
    </>
  );
};

export default ChapterContainer;
