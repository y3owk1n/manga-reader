import { fetchGetJSON } from "@/utils/apiHelper";
import useDebounce from "@/utils/useDebounce";
import { SearchIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Box,
  Center,
  chakra,
  Divider,
  HStack,
  Image as ChakraImage,
  Input,
  InputGroup,
  InputLeftElement,
  Link as ChakraLink,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { FC, useRef, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export interface SearchResultsRes {
  code: number;
  message: string;
  data: SearchResults[];
}

export interface SearchResults {
  id: string;
  coverImg: string;
  title: string;
  latestEpisode: string;
  description: string;
}

const SearchBarModal: FC<Props> = ({ isOpen, onClose }) => {
  const initialRef = useRef<HTMLInputElement>(null);

  const [searchVal, setSearchVal] = useState("");

  const [searchLoading, setSearchLoading] = useState(false);

  const [mangaSearchResults, setMangaSearchResults] =
    useState<SearchResultsRes | null>(null);

  useDebounce(
    async () => {
      setSearchLoading(true);

      if (searchVal === "") {
        setSearchLoading(false);
        setMangaSearchResults(null);
        return;
      }

      if (searchVal) {
        const searchResults: SearchResultsRes = await fetchGetJSON(
          `/api/search?searchTerm=${searchVal}`
        );

        setMangaSearchResults(searchResults);

        setSearchLoading(false);
        return;
      }
      setSearchLoading(false);
      return;
    },
    500,
    [searchVal]
  );

  return (
    <Modal
      size="lg"
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={0}>
          <Stack spacing={4} p={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                ref={initialRef}
                type="search"
                placeholder="搜寻漫画"
                border="none"
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setSearchLoading(true);
                  }
                  setSearchVal(e.target.value);
                }}
              />
            </InputGroup>

            {searchLoading ? (
              <Center>
                <Spinner />
              </Center>
            ) : mangaSearchResults && mangaSearchResults.data.length > 0 ? (
              <>
                <Divider />
                <Stack>
                  {mangaSearchResults.data.map((manga) => (
                    <Link key={manga.id} href={`/manga/${manga.id}`} passHref>
                      <ChakraLink _hover={{ textDecor: "none" }}>
                        <HStack
                          p={2}
                          spacing={6}
                          cursor="pointer"
                          _hover={{
                            bgColor: "gray.100",
                          }}
                          transition={"0.2s ease-in-out"}
                          rounded="lg"
                        >
                          <Box h="full" maxW={"100px"} w="full">
                            <AspectRatio
                              ratio={320 / 424}
                              rounded="md"
                              bgColor="gray.100"
                            >
                              <ChakraImage
                                rounded="md"
                                objectFit="cover"
                                alt={`Cover for ${manga.title}`}
                                src={manga.coverImg}
                              />
                            </AspectRatio>
                          </Box>
                          <Stack>
                            <Text fontWeight={"bold"} noOfLines={1}>
                              {manga.title}
                            </Text>
                            <Text noOfLines={2} fontSize="sm" color="gray.500">
                              {manga.description}
                            </Text>
                            <Text fontSize="sm">
                              更至：
                              <chakra.span color="blue.500">
                                {manga.latestEpisode}
                              </chakra.span>
                            </Text>
                          </Stack>
                        </HStack>
                      </ChakraLink>
                    </Link>
                  ))}
                </Stack>
              </>
            ) : searchVal !== "" ? (
              <Text>很遗憾，您搜索的内容暂时没有找到 🙁</Text>
            ) : (
              <Text>请输入漫画标题 😉</Text>
            )}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchBarModal;
