import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";

interface Props {
  prevChapterId: number | undefined;
  nextChapterId: number | undefined;
  comicId: number;
}

const Pagination: FC<Props> = ({
  prevChapterId,
  nextChapterId,
  children,
  comicId,
}) => {
  const router = useRouter();

  const hasPrev = prevChapterId !== undefined;
  const hasNext = nextChapterId !== undefined;

  return (
    <HStack spacing={6}>
      {hasPrev && (
        <Link href={`/manga/${comicId}/${prevChapterId}`} passHref>
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
      {hasNext && (
        <Link href={`/manga/${comicId}/${nextChapterId}`} passHref>
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
