import { RecommendedListData } from "@/types/dmzj.interface";
import {
  Badge,
  Box,
  GridItem,
  HStack,
  Image as ChakraImage,
  Link as ChakraLink,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";
import LazyLoad from "react-lazyload";

interface Props {
  comic: RecommendedListData;
}

const RecommendedMangaCard: FC<Props> = ({ comic }) => {
  return (
    <GridItem
      bg={useColorModeValue("white", "gray.800")}
      rounded="md"
      border="1px solid rgba(0, 0, 0, 0.15)"
      transition="all 0.2s"
      _hover={{
        shadow: "lg",
        transform: "translateY(-5px)",
      }}
    >
      <Link href={`/manga/${comic.obj_id}`} passHref>
        <ChakraLink _hover={{ textDecor: "none" }}>
          <Box position="relative">
            <LazyLoad>
              <ChakraImage
                loading={"lazy"}
                roundedTop="md"
                objectFit="cover"
                alt={`Cover for ${comic.title}`}
                src={comic.cover}
                w="full"
              />
            </LazyLoad>
            {comic.status !== "" && (
              <HStack bottom={0} left={0} m={2} position="absolute">
                <Badge colorScheme={"blue"}>{comic.status}</Badge>
              </HStack>
            )}
          </Box>

          <Box p={4} textAlign="left">
            <Stack spacing={1} height="full">
              <Text fontSize="md" fontWeight="bold" noOfLines={1}>
                {comic.title}
              </Text>
            </Stack>
          </Box>
        </ChakraLink>
      </Link>
    </GridItem>
  );
};

export default RecommendedMangaCard;
