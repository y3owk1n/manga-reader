import { Box, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React, { FC } from "react";

interface Props {
  bannerImg: StaticImageData;
  bannerAlt: string;
}

const Banner: FC<Props> = ({ bannerImg, bannerAlt, children }) => {
  return (
    <Box w={"full"} position="relative">
      <Box minH={"60vh"} w="full" zIndex={-2} position="relative">
        <Image
          alt={bannerAlt}
          src={bannerImg}
          layout="fill"
          objectFit="cover"
          quality={100}
          placeholder="blur"
        />
      </Box>
      <VStack
        w={"full"}
        justify={"center"}
        px={{ base: 4, md: 8 }}
        position="absolute"
        bottom={0}
        minH={"60vh"}
        bgColor="rgba(0,0,0,0.3)"
      >
        {children}
      </VStack>
    </Box>
  );
};

export default Banner;
