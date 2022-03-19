import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
} from "@chakra-ui/react";
import Link from "next/link";
import { ChapterDetails } from "pages/read/[chapterId]";
import { FC } from "react";

interface Props {
  chapterDetails: ChapterDetails;
}

const BreadcrumbChapter: FC<Props> = ({ chapterDetails }) => {
  return (
    <Box
      bgColor="blue.500"
      color="white"
      py={2}
      position="sticky"
      top={"60px"}
      zIndex={100}
    >
      <Container maxW="container.xl">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href="/" passHref>
              <BreadcrumbLink>首页</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link href={`/manga/${chapterDetails.mangaId}`} passHref>
              <BreadcrumbLink>{chapterDetails.mangaTitle}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              cursor="text"
              _hover={{ textDecor: "none" }}
              fontWeight="bold"
            >
              {chapterDetails.chapterTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Container>
    </Box>
  );
};

export default BreadcrumbChapter;
