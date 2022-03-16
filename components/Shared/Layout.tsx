import { Box, Container } from "@chakra-ui/react";
import { FC } from "react";
import FooterSmallNav from "../Footer/FooterSmallNav";
import WithSubnavigation from "../Header/WithSubnavigation";

const Layout: FC = ({ children }) => {
  return (
    <Box>
      <WithSubnavigation />
      <Container maxW="container.xl" my={14}>
        {children}
      </Container>
      <FooterSmallNav />
    </Box>
  );
};

export default Layout;
