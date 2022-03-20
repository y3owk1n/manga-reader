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
  const [height, setHeight] = useState(800);

  return (
    <Box
      w="full"
      minH={`${height}px`}
      ref={(el: HTMLDivElement) => (itemsRef.current[Number(page) - 1] = el)}
      bgImage={`url(/assets/placeholder.png)`}
    >
      <LazyLoadImage
        id={`page-${page}`}
        src={image}
        alt={`Page ${page}`}
        width={"800px"}
        height={`${height}px`}
        afterLoad={() => {
          const img = new Image();
          img.src = image;
          console.log(img.height);
          setHeight(img.height);
        }}
      />
    </Box>
  );
};

export default ChapterImagesContainer;
