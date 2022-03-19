import { Box } from "@chakra-ui/react";
import { FC } from "react";
import FooterSmallNav from "../Footer/FooterSmallNav";
import WithSubnavigation from "../Header/WithSubnavigation";

const Layout: FC = ({ children }) => {
  return (
    <Box>
      <WithSubnavigation />
      {children}
      <FooterSmallNav />
    </Box>
  );
};

export default Layout;
