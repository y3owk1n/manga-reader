import { Box, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import React, { FC } from "react";

interface Props {
  headerText: string;
  gridColumnsArray?: (number | null)[];
}

const MangaGridContainer: FC<Props> = ({
  children,
  headerText,
  gridColumnsArray = [2, null, 4, 6],
}) => {
  return (
    <Box>
      <Stack spacing={4}>
        <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }}>
          {headerText}
        </Heading>

        <SimpleGrid columns={gridColumnsArray} spacing={4} w="full">
          {children}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default MangaGridContainer;
