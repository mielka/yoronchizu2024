import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";

interface NavHeadProps {
  children: string;
  color: string;
}

export const NavigationHead: FC<NavHeadProps> = ({ color, children }) => (
  <Flex
    w="100%"
    align="center"
    textAlign="center"
    _before={{
      marginRight: 1,
      content: `""`,
      borderTop: "1.4px solid",
      borderTopColor: `${color}`,
      flexGrow: 1,
    }}
    _after={{
      marginLeft: 1,
      content: `""`,
      borderTop: "1.4px solid",
      borderTopColor: `${color}`,
      flexGrow: 1,
    }}
  >
    <Text fontWeight="medium" fontSize="xs" color={color}>
      {children}
    </Text>
  </Flex>
);
