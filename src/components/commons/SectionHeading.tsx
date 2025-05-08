import { Text, TextProps } from "@chakra-ui/react";
import React from "react";

// 色の指定
type variant = "brand" | "variation4";
interface Props extends TextProps {
  children: React.ReactNode;
  variant?: variant;
}

export const SectionHeading = ({
  children,
  variant = "brand",
  ...props
}: Props) => {
  return (
    <Text
      fontSize="large"
      fontWeight="bold"
      color={variant}
      pl={4}
      mx={2}
      mb={2}
      as="h2"
      borderColor={variant}
      borderBottomWidth={10}
      borderBottomRadius={10}
      {...props}
    >
      {children}
    </Text>
  );
};
