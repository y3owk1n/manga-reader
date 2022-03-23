import { CategorySwrRes } from "@/types/swrResponse.interface";
import {
  Box,
  Button,
  Center,
  Spinner,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { TransitionOptions } from "next-usequerystate";
import React, { FC } from "react";

interface Props {
  categoryData: CategorySwrRes | undefined;
  categoryError: Error | undefined;
  theme: number;
  setTheme: (
    value: number | ((old: number) => number | null) | null,
    transitionOptions?: TransitionOptions | undefined
  ) => Promise<boolean>;
  audience: number;
  setAudience: (
    value: number | ((old: number) => number | null) | null,
    transitionOptions?: TransitionOptions | undefined
  ) => Promise<boolean>;
  status: number;
  setStatus: (
    value: number | ((old: number) => number | null) | null,
    transitionOptions?: TransitionOptions | undefined
  ) => Promise<boolean>;
  location: number;
  setLocation: (
    value: number | ((old: number) => number | null) | null,
    transitionOptions?: TransitionOptions | undefined
  ) => Promise<boolean>;
}

const CategoryList: FC<Props> = ({
  categoryData,
  categoryError,
  theme,
  setTheme,
  audience,
  setAudience,
  status,
  setStatus,
  location,
  setLocation,
}) => {
  if (!categoryData) {
    return (
      <Box>
        <Center>
          <Spinner />
        </Center>
      </Box>
    );
  }

  const { data } = categoryData;

  if (categoryError) {
    return (
      <Box>
        <Text>{categoryError.message}</Text>
      </Box>
    );
  }

  const getCurrent = (title: string, tagId: number) => {
    switch (title) {
      case "题材":
        return theme === tagId;
      case "读者群":
        return audience === tagId;
      case "进度":
        return status === tagId;
      case "地域":
        return location === tagId;
      default:
        return false;
    }
  };

  const handleTagSelect = (title: string, tagId: number) => {
    switch (title) {
      case "题材":
        return setTheme(tagId);
      case "读者群":
        return setAudience(tagId);
      case "进度":
        return setStatus(tagId);
      case "地域":
        return setLocation(tagId);
      default:
        return false;
    }
  };

  return (
    <Box>
      <Stack spacing={6}>
        {data.map((category) => (
          <Stack key={category.title}>
            <Text fontWeight="bold">{category.title}</Text>
            <Wrap>
              {category.items
                .filter((item) => item.tag_id !== 0)
                .map((item) => (
                  <WrapItem key={item.tag_id}>
                    <Button
                      fontWeight={
                        getCurrent(category.title, item.tag_id)
                          ? "bold"
                          : "normal"
                      }
                      variant="link"
                      colorScheme={
                        getCurrent(category.title, item.tag_id)
                          ? "blue"
                          : "gray"
                      }
                      onClick={() =>
                        handleTagSelect(category.title, item.tag_id)
                      }
                    >
                      {item.tag_name}
                    </Button>
                  </WrapItem>
                ))}
            </Wrap>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default CategoryList;
