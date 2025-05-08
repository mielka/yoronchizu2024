import {
  Center,
  Container,
  Grid,
  GridItem,
  Link,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
export const Footer: FC = () => {
  return (
    <Center as="footer" backgroundColor="footerBackground" w="100%" p="0" m="0">
      <Container centerContent maxW="container.sm" p="4">
        <Center>
          <a href="#">
            <Text fontWeight="bold" fontSize="10.5px">
              トップページ
            </Text>
          </a>
        </Center>
        <Grid templateColumns="repeat(3, 1fr)" w="100%" pt="2">
          <GridItem>
            <Link href="/polis">
              <Text fontWeight="bold" fontSize="10.5px" textAlign="center">
                世論地図(β版)
              </Text>
            </Link>
          </GridItem>
          <GridItem>
            <Link href="https://mielka.org/">
              <Text fontWeight="bold" fontSize="10.5px" textAlign="center">
                運営団体について
              </Text>
            </Link>
          </GridItem>
        </Grid>
        <Center mt="4">
          <Text fontWeight="bold" fontSize="10.5">
            ©︎ Mielka All rights reserved.
          </Text>
        </Center>
      </Container>
    </Center>
  );
};
