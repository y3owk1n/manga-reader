import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import SearchBarModal from "./SearchBarModal";

interface Props {
  iconOnly?: boolean;
}

const SearchBarContainer: FC<Props> = ({ iconOnly = false }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      maxW={iconOnly ? undefined : "500px"}
      w={iconOnly ? undefined : "full"}
      rounded="lg"
    >
      {iconOnly ? (
        <IconButton
          aria-label="search button"
          icon={<SearchIcon />}
          onClick={onOpen}
          variant={"ghost"}
        />
      ) : (
        <Button
          leftIcon={<SearchIcon />}
          variant="outline"
          bgColor="white"
          w="full"
          color="gray.500"
          _hover={{
            bgColor: "white",
          }}
          textAlign="left"
          fontWeight={"normal"}
          display="inline-block"
          onClick={onOpen}
        >
          搜寻漫画
        </Button>
      )}

      <SearchBarModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default SearchBarContainer;
