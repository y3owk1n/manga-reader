import { NavItem } from "@/utils/navItems";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Collapse,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <NextLink href={href ?? "#"} passHref>
        <Link
          fontWeight={router.asPath === href ? "bold" : "normal"}
          color={router.asPath === href ? "blue.500" : "gray.600"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Flex py={2} justify={"space-between"} align={"center"}>
            <Text>{label}</Text>
            {children && (
              <Icon
                as={ChevronDownIcon}
                transition={"all .25s ease-in-out"}
                transform={isOpen ? "rotate(180deg)" : ""}
                w={6}
                h={6}
              />
            )}
          </Flex>
        </Link>
      </NextLink>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <NextLink key={child.label} href={child.href as string} passHref>
                <Link
                  key={child.label}
                  py={2}
                  href={child.href}
                  fontWeight={router.asPath === child.href ? "bold" : "normal"}
                  color={router.asPath === child.href ? "blue.500" : "gray.600"}
                >
                  {child.label}
                </Link>
              </NextLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default MobileNavItem;
