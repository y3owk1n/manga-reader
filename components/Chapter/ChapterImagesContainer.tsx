import { replaceToMuwai } from "@/utils/replaceToMuwai";
import { Box, chakra } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
  image: string;
  page: string;
  itemsRef: React.MutableRefObject<HTMLDivElement[]>;
}

const LazyLoadChakra = chakra(LazyLoadImage, {
  shouldForwardProp: (prop) =>
    [
      "alt",
      "src",
      "objectFit",
      "effect",
      "height",
      "width",
      "placeholderSrc",
      "placeholder",
      "afterLoad",
    ].includes(prop),
});

const ChapterImagesContainer: FC<Props> = ({ image, page, itemsRef }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box
      w="100%"
      h={loaded ? "100%" : `800px`}
      ref={(el: HTMLDivElement) => (itemsRef.current[Number(page) - 1] = el)}
      bgImage={`url(/assets/placeholder.png)`}
      bgSize="cover"
    >
      <LazyLoadImage
        id={`page-${page}`}
        src={replaceToMuwai(image)}
        alt={`Page ${page}`}
        width={"100%"}
        // delayMethod="debounce"
        // delayTime={500}
        height={`100%`}
        afterLoad={() => {
          setLoaded(true);
        }}
      />
    </Box>
  );
};

export default ChapterImagesContainer;
