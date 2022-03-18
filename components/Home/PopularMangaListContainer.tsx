import {
  Badge,
  Box,
  Heading,
  HStack,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { PopularMangaContainer } from "pages";
import React, { FC } from "react";

interface Props {
  popularList: PopularMangaContainer;
}

const PopularMangaListContainer: FC<Props> = ({ popularList }) => {
  return (
    <Box>
      <Stack spacing={4}>
        <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }}>
          {popularList.title}
        </Heading>
        <Stack bgColor="gray.100" rounded="lg" padding={4} spacing={4}>
          {popularList.item.map((list) => (
            <HStack key={list.id}>
              <Badge rounded="full" colorScheme={"blue"} fontSize="md">
                {list.rank}
              </Badge>
              <Link href={`/manga/${list.id}`} passHref>
                <ChakraLink _hover={{ textDecor: "none", color: "blue.500" }}>
                  <Text noOfLines={1}>{list.title}</Text>
                </ChakraLink>
              </Link>
            </HStack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default PopularMangaListContainer;
