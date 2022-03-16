import useKeyPress from "@/utils/useKeyPress";
import { Box, Flex, Image } from "@chakra-ui/react";
import useEmblaCarousel from "embla-carousel-react";
import { useQueryState } from "next-usequerystate";
import { FC, useCallback, useEffect, useState } from "react";
import { NextButton, PrevButton } from "./ReaderCarouselButtons";

interface Props {
  images: ImagesProps[];
}

interface ImagesProps {
  src: string;
  alt: string;
}

const ReaderCarousel: FC<Props> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useQueryState("page", {
    history: "push",
    parse: (query: string) => parseInt(query),
    defaultValue: 0,
  });

  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap(), {
      scroll: false,
      shallow: true,
    });
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      if (embla?.canScrollPrev) {
        setSelectedIndex(selectedIndex - 1, {
          scroll: false,
          shallow: true,
        });
      }
    }
    if (event.key === "ArrowRight") {
      if (embla?.canScrollNext) {
        setSelectedIndex(selectedIndex + 1, {
          scroll: false,
          shallow: true,
        });
      }
    }
  };

  useKeyPress(["ArrowLeft", "ArrowRight"], onKeyPress);

  useEffect(() => {
    if (!embla) return;
    embla.scrollTo(selectedIndex);
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect, selectedIndex]);

  return (
    <Box
      pos={"relative"}
      maxW="500px"
      w="100%"
      h="100%"
      mx="auto"
      bgColor="black"
    >
      <Box overflow={"hidden"} cursor={"grab"} ref={viewportRef}>
        <Flex ml={-4} userSelect={"none"} align="center">
          {images.map((images, index) => (
            <Box key={index} pl={4} minW="100%">
              <Image src={images.src} alt={images.alt} objectFit="cover" />
            </Box>
          ))}
        </Flex>
      </Box>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </Box>
  );
};

export default ReaderCarousel;
