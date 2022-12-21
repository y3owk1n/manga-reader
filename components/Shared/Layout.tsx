import { Box } from "@chakra-ui/react";
import {  ReactNode } from "react";
import FooterSmallNav from "../Footer/FooterSmallNav";
import WithSubnavigation from "../Header/WithSubnavigation";

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<Box>
			<WithSubnavigation />
			{children}
			<FooterSmallNav />
		</Box>
	);
};

export default Layout;
