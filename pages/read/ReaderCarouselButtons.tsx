import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { FC } from "react";

interface IPrevNextButton {
  enabled: boolean;
  onClick: () => void | undefined;
}

export const PrevButton: FC<IPrevNextButton> = ({ enabled, onClick }) => (
  <Button
    pos={"absolute"}
    zIndex={1}
    top={"50%"}
    left={4}
    transform={"translateY(-50%)"}
    onClick={onClick}
    disabled={!enabled}
    w={10}
    h={10}
  >
    <ChevronLeftIcon fontSize={"4xl"} />
  </Button>
);

export const NextButton: FC<IPrevNextButton> = ({ enabled, onClick }) => (
  <Button
    pos={"absolute"}
    zIndex={1}
    top={"50%"}
    right={4}
    transform={"translateY(-50%)"}
    onClick={onClick}
    disabled={!enabled}
    w={10}
    h={10}
  >
    <ChevronRightIcon fontSize={"4xl"} />
  </Button>
);
