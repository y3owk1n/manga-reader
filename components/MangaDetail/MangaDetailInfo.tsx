import { MangaDetailInfo } from "@/types/dmzj.interface";
import {
  Badge,
  Box,
  GridItem,
  Heading,
  Image as ChakraImage,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { FC } from "react";
import LazyLoad from "react-lazyload";

interface Props {
  mangaDetail: MangaDetailInfo;
}

const MangaDetailInfo: FC<Props> = ({ mangaDetail }) => {
  return (
    <SimpleGrid columns={[6, null, 6, 8]} spacing={4}>
      <GridItem colSpan={[2, null, 2, 2]}>
        <Box position="relative">
          <LazyLoad>
            <ChakraImage
              loading={"lazy"}
              rounded="md"
              objectFit="cover"
              alt={`Cover for ${mangaDetail.title}`}
              src={mangaDetail.cover}
              bgColor="gray.100"
            />
          </LazyLoad>
        </Box>
      </GridItem>
      <GridItem colSpan={[4, null, 4, 6]}>
        <Stack spacing={4}>
          <Heading fontWeight="bold" fontSize="2xl">
            {mangaDetail.title}
          </Heading>
          <Wrap align={"center"}>
            <WrapItem>
              <Text>题材: </Text>
            </WrapItem>
            <Badge colorScheme={"blue"}>{mangaDetail.types}</Badge>
          </Wrap>
          <Text fontSize={{ base: "sm", md: "md" }}>
            {mangaDetail.description}
          </Text>
        </Stack>
      </GridItem>
    </SimpleGrid>
  );
};

export default MangaDetailInfo;
