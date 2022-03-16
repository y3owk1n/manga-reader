import { Box, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import React, { FC } from "react";

interface Props {
  headerText: string;
}

const MangaGridContainer: FC<Props> = ({ children, headerText }) => {
  return (
    <Box>
      <Stack spacing={0} align={"center"} textAlign={"center"}>
        <Heading as="h2">{headerText}</Heading>

        <SimpleGrid columns={[2, null, 3, 4]} spacing={4} pt={4} w="full">
          {children}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default MangaGridContainer;
