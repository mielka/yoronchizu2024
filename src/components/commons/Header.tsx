import {
  Center,
  Container,
  Flex,
  Img,
  Spacer,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { getAssetsPath } from "../../utils/getAssetPath";
import { NavMenuButton } from "./NavMenuButton";

interface HeaderProps {
  Tool?: ReactElement;
}

export const Header: FC<HeaderProps> = ({ Tool }) => {
  const isLargerThanMD = useBreakpointValue({ base: false, md: true });

  return (
    <Center
      as="header"
      borderBottomColor="border"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      w="100%"
      h={["56px", "64px"]}
      py="0"
      m="0"
      alignItems="center"
      backgroundColor="contentBackground"
    >
      <Container maxW="container.md" px="4">
        <Flex width="100" alignItems="center">
          <Flex flex="1" color="text" justifyContent={"start"}>
            <a href="/polis">
              <Img
                alt="JAPAN CHOICE"
                width={["124px", "142px"]}
                src={getAssetsPath("/images/logo_jc.png")}
              />
            </a>
          </Flex>
          <Spacer />
          <Flex flex="1" justifyContent="right" alignItems="center">
            {isLargerThanMD ? <>{Tool}</> : <NavMenuButton />}
          </Flex>
        </Flex>
      </Container>
    </Center>
  );
};
