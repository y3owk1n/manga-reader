import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PrevNextChapter } from "pages/read/[chapterId]";
import React, { FC } from "react";

interface Props {
  prevNextChapterData: PrevNextChapter;
}

const Pagination: FC<Props> = ({ prevNextChapterData, children }) => {
  const router = useRouter();

  return (
    <HStack spacing={6}>
      {prevNextChapterData.hasPrev && (
        <Link href={`/read/${prevNextChapterData.prevChapterId}`} passHref>
          <Button
            colorScheme={"blue"}
            variant="link"
            fontWeight={"normal"}
            leftIcon={<ChevronLeftIcon />}
            as={"a"}
          >
            上一章
          </Button>
        </Link>
      )}
      {children}
      {prevNextChapterData.hasNext && (
        <Link href={`/read/${prevNextChapterData.nextChapterId}`} passHref>
          <Button
            colorScheme={"blue"}
            variant="link"
            fontWeight={"normal"}
            rightIcon={<ChevronRightIcon />}
            as={"a"}
          >
            下一章
          </Button>
        </Link>
      )}
    </HStack>
  );
};

export default Pagination;
