import { Box, Image as ChakraImage, VStack } from "@chakra-ui/react";
import React, { FC } from "react";

const Banner: FC = ({ children }) => {
  return (
    <Box w={"full"} position="relative">
      <ChakraImage
        rounded="lg"
        w="full"
        h={{ base: "30vh", md: "60vh" }}
        alt={`background image for banner`}
        src={`/assets/banner.jpg`}
        objectFit="cover"
        bgColor="gray.100"
        loading={"eager"}
      />
      <VStack
        w={"full"}
        justify={"center"}
        px={{ base: 4, md: 8 }}
        position="absolute"
        bottom={0}
        minH={{ base: "30vh", md: "60vh" }}
        bgColor="rgba(0,0,0,0.3)"
        rounded="lg"
      >
        {children}
      </VStack>
    </Box>
  );
};

export default Banner;
