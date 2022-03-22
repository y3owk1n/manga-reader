import FavouriteMangaContainer from "@/components/Favourite/FavouriteMangaContainer";
import { LocalStorageFavouriteProp } from "@/components/MangaDetail/MangaDetailInfo";
import Layout from "@/components/Shared/Layout";
import useLocalStorage from "@/utils/useLocalStorage";
import { Container, Stack, Text } from "@chakra-ui/react";
import React from "react";

const Favourite = () => {
  const [favourite, setFavourite] = useLocalStorage<
    LocalStorageFavouriteProp[]
  >("favourite", []);

  return (
    <Layout>
      <Container maxW="container.xl" my={6}>
        <Stack spacing={6}>
          {favourite && favourite.length > 0 ? (
            <FavouriteMangaContainer
              headerText="已收藏"
              comicData={favourite}
            />
          ) : (
            <Text>没有资料</Text>
          )}
        </Stack>
      </Container>
    </Layout>
  );
};

export default Favourite;
