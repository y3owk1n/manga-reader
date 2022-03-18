import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Registration",
    href: "/registration",
  },
  {
    label: "Ticketing",
    href: "/ticketing",
  },
  {
    label: "Rules",
    href: "/rules",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Contact us",
    href: "/contact",
  },
];

const FooterSmallNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"7xl"}
        py={4}
        direction={"column"}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "left", md: "center" }}
      >
        {/* <Stack direction={"row"} spacing={6}>
          <Stack direction={{ base: "column", md: "row" }}>
            {NAV_ITEMS.map((nav) => (
              <NextLink href={nav.href} key={nav.label} passHref>
                <Link
                  p={2}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {nav.label}
                </Link>
              </NextLink>
            ))}
          </Stack>
        </Stack> */}
        <Text fontSize={"sm"} textAlign={"center"}>
          © 2022 Manga 😍. All rights reserved
        </Text>
      </Container>
    </Box>
  );
};

export default FooterSmallNav;
