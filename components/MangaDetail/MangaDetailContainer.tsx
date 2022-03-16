import {
  ChapterDetail,
  Daum,
  Volumes,
  VolumesDetail,
} from "@/types/mangaDexApi.interface";
import { Button, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import MangaDetailInfo from "./MangaDetailInfo";

interface Props {
  mangaDetail: Daum;
  mangaVolumeAndChapter: Volumes;
}

interface VolumesArray {
  data: VolumesDetail;
}

interface ChapterArray {
  data: ChapterDetail;
}

const MangaDetailContainer: FC<Props> = ({
  mangaDetail,
  mangaVolumeAndChapter,
}) => {
  const router = useRouter();

  const volumesArray: VolumesArray[] = [];
  Object.keys(mangaVolumeAndChapter).forEach((key) =>
    volumesArray.push({
      data: mangaVolumeAndChapter[key],
    })
  );

  return (
    <Stack>
      <MangaDetailInfo mangaDetail={mangaDetail} />

      <Stack bgColor="gray.50" rounded="lg" p={6}>
        <Text fontWeight="bold">Chapters</Text>
        <Wrap>
          {volumesArray.map((vol) => {
            const chapter = vol.data.chapters;

            const chapterArray: ChapterArray[] = [];
            Object.keys(chapter).forEach((key) =>
              chapterArray.push({
                data: chapter[key],
              })
            );

            return (
              <React.Fragment key={vol.data.volume}>
                {chapterArray.map((chap) => (
                  <WrapItem key={chap.data.id} justifyContent="space-between">
                    <Button
                      minW="100px"
                      variant={"outline"}
                      onClick={() => router.push(`/read/${chap.data.id}`)}
                    >
                      {chap.data.chapter}
                    </Button>
                  </WrapItem>
                ))}
              </React.Fragment>
            );
          })}
        </Wrap>
      </Stack>
    </Stack>
  );
};

export default MangaDetailContainer;
