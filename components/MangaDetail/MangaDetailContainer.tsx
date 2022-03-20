import {
  ChapterList,
  MangaContainer,
  MangaDetail,
} from "@/types/manga.interface";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  chakra,
  HStack,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import LatestUpdatedMangaCard from "../Home/LatestUpdatedMangaCard";
import MangaGridContainer from "../Home/MangaGridContainer";
import MangaDetailInfo from "./MangaDetailInfo";

interface Props {
  mangaDetail: MangaDetail;
  mangaChaptersData: ChapterList;
  guessYouLikeData: MangaContainer;
}

const rowToShow = 5;

const MangaDetailContainer: FC<Props> = ({
  mangaDetail,
  mangaChaptersData,
  guessYouLikeData,
}) => {
  const dataLength = mangaChaptersData.item.length;
  const responsiveColumns = useBreakpointValue({ base: 2, lg: 3, xl: 4 });
  const totalItemsToShow = responsiveColumns! * rowToShow;

  const [arrayLength, setArrayLength] = useState(0);

  const [showAllChapters, setShowAllChapters] = useState(false);

  useEffect(() => {
    if (showAllChapters) {
      setArrayLength(dataLength);
    } else {
      if (dataLength >= totalItemsToShow) {
        setArrayLength(totalItemsToShow);
        return;
      } else {
        setArrayLength(dataLength);
        return;
      }
    }
  }, [dataLength, responsiveColumns, showAllChapters, totalItemsToShow]);

  return (
    <Stack spacing={6}>
      <MangaDetailInfo mangaDetail={mangaDetail} />

      <Stack bgColor="gray.50" rounded="lg" p={6}>
        <SimpleGrid columns={responsiveColumns} spacing={4}>
          {mangaChaptersData.item.slice(0, arrayLength).map((chap) => (
            <Link href={`/read/${chap.id}`} key={chap.id} passHref>
              <ChakraLink _hover={{ textDecor: "none" }}>
                <Button
                  variant={"outline"}
                  size="md"
                  // as={"a"}
                  w="full"
                  fontWeight={"normal"}
                  colorScheme={"blue"}
                  fontSize="sm"
                  noOfLines={1}
                >
                  <HStack align="center">
                    {chap.isNew && (
                      <Badge colorScheme="red" variant="solid">
                        新
                      </Badge>
                    )}
                    <chakra.span w="full">{chap.title}</chakra.span>
                  </HStack>
                </Button>
              </ChakraLink>
            </Link>
          ))}
        </SimpleGrid>
        {dataLength > totalItemsToShow && (
          <Stack align="center">
            <Button
              pt={4}
              variant={"link"}
              _hover={{ textDecor: "none" }}
              colorScheme="blue"
              fontWeight={"normal"}
              rightIcon={
                showAllChapters ? <ChevronUpIcon /> : <ChevronDownIcon />
              }
              onClick={() => setShowAllChapters(!showAllChapters)}
            >
              {showAllChapters ? "收起" : "查看所有章节"}
            </Button>
          </Stack>
        )}
      </Stack>

      <MangaGridContainer headerText={guessYouLikeData.title}>
        {guessYouLikeData.item.map((m) => (
          <LatestUpdatedMangaCard key={m.id} manga={m} />
        ))}
      </MangaGridContainer>
    </Stack>
  );
};

export default MangaDetailContainer;
