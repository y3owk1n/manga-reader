import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
} from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

interface Props {
  comicId: number;
  currentPage: number;
  totalPages: number;
  chapterTitle: string;
}

const BreadcrumbChapter: FC<Props> = ({
  comicId,
  currentPage,
  totalPages,
  chapterTitle,
}) => {
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
        <Breadcrumb fontSize={{ base: "sm", md: "md" }}>
          <BreadcrumbItem>
            <Link href="/" passHref>
              <BreadcrumbLink>首页</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link href={`/manga/${comicId}`} passHref>
              <BreadcrumbLink>漫画主页</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              cursor="text"
              _hover={{ textDecor: "none" }}
              fontWeight="bold"
            >
              {`${chapterTitle} - 第${currentPage}/${totalPages}页`}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Container>
    </Box>
  );
};

export default BreadcrumbChapter;
