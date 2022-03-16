import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import BannerImg from "../../public/assets/banner.jpg";
import Banner from "./Banner";
import SearchBarModal from "./SearchBarModal";

const SearchBarContainer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Banner bannerImg={BannerImg} bannerAlt="background image">
      <Box maxW="500px" w="full" rounded="lg">
        <Button
          leftIcon={<SearchIcon />}
          bgColor="white"
          w="full"
          color="gray.300"
          _hover={{
            bgColor: "white",
          }}
          textAlign="left"
          fontWeight={"normal"}
          display="inline-block"
          onClick={onOpen}
        >
          Search
        </Button>

        <SearchBarModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </Banner>
  );
};

export default SearchBarContainer;
