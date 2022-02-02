import React from "react";
import {
  RectButtonProps,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Container, Icon, Title, Button } from "./styles";

interface Props extends RectButtonProps {
  type: "up" | "down";
  title: string;
  isActive: boolean;
}

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

export default function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: Props) {
  return (
    <Container isActive={isActive} type={type}>
      <GestureHandlerRootView>
        <Button {...rest}>
          <Icon name={icons[type]} type={type} />
          <Title>{title}</Title>
        </Button>
      </GestureHandlerRootView>
    </Container>
  );
}
