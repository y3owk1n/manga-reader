import { MangaList } from "@/types/mangaDexApi.interface";
import { fetchGetJSON } from "@/utils/apiHelper";
import useDebounce from "@/utils/useDebounce";
import { SearchIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Badge,
  Box,
  chakra,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Link as ChakraLink,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useRef, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SearchBarModal: FC<Props> = ({ isOpen, onClose }) => {
  const initialRef = useRef<HTMLInputElement>(null);

  const [searchVal, setSearchVal] = useState("");

  const [searchLoading, setSearchLoading] = useState(false);

  const [mangaSearchResults, setMangaSearchResults] =
    useState<MangaList | null>(null);

  const CoverImg = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["alt", "src", "layout", "objectFit", "quality"].includes(prop),
  });

  useDebounce(
    async () => {
      setSearchLoading(true);

      if (searchVal === "") {
        setSearchLoading(false);
        setMangaSearchResults(null);
        return;
      }

      if (searchVal) {
        const searchResults: MangaList = await fetchGetJSON(
          `https://api.mangadex.org/manga?title=${searchVal}&limit=5&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includes[]=cover_art&order[relevance]=desc`
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

  const renderBadge = (status: string) => {
    if (status === "ongoing") {
      return <Badge colorScheme="orange">{status}</Badge>;
    }

    if (status === "completed") {
      return <Badge colorScheme="green">{status}</Badge>;
    }

    if (status === "hiatus") {
      return <Badge colorScheme="yellow">{status}</Badge>;
    }

    if (status === "cancelled") {
      return <Badge colorScheme="red">{status}</Badge>;
    }
  };

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
                placeholder="Search"
                border="none"
                onChange={(e) => setSearchVal(e.target.value)}
              />
            </InputGroup>

            {searchVal !== "" &&
              (mangaSearchResults && mangaSearchResults.data.length > 0 ? (
                <>
                  <Divider />
                  <Stack>
                    {mangaSearchResults.data.map((manga) => {
                      const getCoverArt = manga.relationships.filter(
                        (m) => m.type === "cover_art"
                      );

                      return (
                        <Link
                          key={manga.id}
                          href={`/manga/${manga.id}`}
                          passHref
                        >
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
                                <AspectRatio ratio={640 / 1005}>
                                  <CoverImg
                                    roundedTop="md"
                                    layout="fill"
                                    rounded="md"
                                    objectFit="cover"
                                    alt={`Cover for ${manga.attributes.title.en}`}
                                    src={`https://uploads.mangadex.org/covers/${manga.id}/${getCoverArt[0].attributes?.fileName}`}
                                    quality={100}
                                  />
                                </AspectRatio>
                              </Box>
                              <Stack spacing={0}>
                                <Text fontWeight={"bold"}>
                                  {manga.attributes.title.en}
                                </Text>
                                {manga.attributes.status && (
                                  <Box>
                                    {renderBadge(manga.attributes.status)}
                                  </Box>
                                )}
                              </Stack>
                            </HStack>
                          </ChakraLink>
                        </Link>
                      );
                    })}
                  </Stack>
                </>
              ) : (
                <Text>No Results...</Text>
              ))}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchBarModal;
