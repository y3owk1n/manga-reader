import { Daum, DaumChapterList } from "@/types/mangaDexApi.interface";
import { Button, chakra, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import MangaDetailInfo from "./MangaDetailInfo";

interface Props {
  mangaDetail: Daum;
  mangaVolumeAndChapter: DaumChapterList[];
}

const MangaDetailContainer: FC<Props> = ({
  mangaDetail,
  mangaVolumeAndChapter,
}) => {
  const router = useRouter();

  return (
    <Stack>
      <MangaDetailInfo mangaDetail={mangaDetail} />

      <Stack bgColor="gray.50" rounded="lg" p={6}>
        <Text fontWeight="bold">Chapters</Text>
        <SimpleGrid columns={[2, null, 3, 4]} spacing={4}>
          {mangaVolumeAndChapter.map((chap) => (
            <Button
              key={chap.id}
              variant={"outline"}
              w="full"
              onClick={() => router.push(`/read/${chap.id}`)}
            >
              {chap.attributes.chapter}
              <chakra.span
                isTruncated
                fontSize={"sm"}
                fontWeight="normal"
                ml={1}
              >
                {chap.attributes.chapter && chap.attributes.title && "- "}
                {chap.attributes.title && chap.attributes.title}
              </chakra.span>
            </Button>
          ))}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
};

export default MangaDetailContainer;
