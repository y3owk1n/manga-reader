import Layout from "@/components/Shared/Layout";
import { Container, Text } from "@chakra-ui/react";
import React from "react";

const Custom404 = () => {
  return (
    <Layout>
      <Container maxW="container.xl" my={6} h="80vh">
        <Text>Page Not Found</Text>
      </Container>
    </Layout>
  );
};

export default Custom404;
