import BreadcrumbChapter from "@/components/Chapter/BreadcrumbChapter";
import Pagination from "@/components/Chapter/Pagination";
import {
  ChapterDetails,
  ChapterImages,
  PrevNextChapter,
} from "@/types/manga.interface";
import {
  AspectRatio,
  Box,
  chakra,
  Container,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { FC, useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
  chapterDetails: ChapterDetails;
  chapterImages: ChapterImages[];
  prevNextChapterData: PrevNextChapter;
}

const LazyLoadChakra = chakra(LazyLoadImage, {
  shouldForwardProp: (prop) =>
    ["alt", "src", "objectFit", "effect", "height", "width"].includes(prop),
});

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
      const currentHeight = window.scrollY + window.innerHeight;

      // console.log("---");
      const items = itemsRef.current.filter((item, index) => {
        // console.log(
        //   `Page ${index + 1}`,
        //   currentHeight,
        //   item.offsetTop + item.height
        // );
        return currentHeight <= item.offsetTop + item.clientHeight;
      });

      setCurrentPage(
        items.length <= 0
          ? chapterImages.length
          : chapterImages.length - items.length + 1
      );
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
            {chapterImages.map(({ image, page, width, height }) => (
              <AspectRatio
                ratio={width / height}
                key={page}
                w="full"
                ref={(el: HTMLDivElement) =>
                  (itemsRef.current[Number(page) - 1] = el)
                }
              >
                <LazyLoadChakra
                  id={`page-${page}`}
                  src={image}
                  height={height}
                  width={width}
                  alt={`Page ${page}`}
                  objectFit={"cover"}
                  key={page}
                  bgColor="gray.100"
                />
              </AspectRatio>
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
