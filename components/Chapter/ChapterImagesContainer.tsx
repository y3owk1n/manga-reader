import { replaceToMuwai } from "@/utils/replaceToMuwai";
import { Box,  Image } from "@chakra-ui/react";
import React, { FC, useState } from "react";

interface Props {
  image: string;
  page: string;
  itemsRef: React.MutableRefObject<HTMLDivElement[]>;
}


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
                {/* Add lazyload here */}
        <Image
          id={`page-${page}`}
          src={replaceToMuwai(image)}
          alt={`Page ${page}`}
          width={"100%"}
          height={`100%`}
          onLoad={() => {
            setLoaded(true);
          }}
        />
    </Box>
  );
};

export default ChapterImagesContainer;
