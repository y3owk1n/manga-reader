import Banner from "@/components/Home/Banner";
import RecommendedGridContainer from "@/components/Home/RecommendedGridContainer";
import Layout from "@/components/Shared/Layout";
import { RecommendedSwrRes } from "@/types/swrResponse.interface";
import { fetchGetJSON } from "@/utils/apiHelper";
import { Container, Heading, Stack } from "@chakra-ui/react";
import useSWR from "swr";

const Home = () => {
  const { data: recommendedData, error: recommendedError } = useSWR<
    RecommendedSwrRes,
    Error
  >(`/api/recommended`, fetchGetJSON);

  return (
    <Layout>
      <Container maxW="container.xl" my={6}>
        <Stack spacing={6}>
          <Banner>
            <Heading as="h1" color="white">
              我爱漫画，漫画爱我
            </Heading>
          </Banner>
          <RecommendedGridContainer
            recommendedData={recommendedData}
            recommendedError={recommendedError}
          />
        </Stack>
      </Container>
    </Layout>
  );
};

export default Home;
