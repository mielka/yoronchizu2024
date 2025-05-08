import { Container, Text } from "@chakra-ui/react";
import { FC } from "react";
import { ServiceHead } from "../../commons/ServiceHead";

export const PolisServiceHeader: FC = () => {
  return (
    <Container maxW="container.md" borderRadius={[0, 0, 0, 9]}>
      <ServiceHead
        title="世論地図(β版)"
        description={
          <>
            <Text fontWeight="bold" fontSize="medium">
              一人ひとりの多様な意見。
              <br />
              地図にして可視化してみると、
              <br />
              合意できる点、 本当に対立している点が見えてくるかもしれません。
              <br />
              <br />
              意見をグループ分けして可視化する、
              <br />
              AI時代の新しい民主主義の実験場
              <br />
              「世論地図」へようこそ
            </Text>
          </>
        }
      />
    </Container>
  );
};
