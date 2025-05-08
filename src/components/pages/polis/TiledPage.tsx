import type { NextPage } from "next";
import { SectionHeading } from "../../commons/SectionHeading";
import { Scatter } from "./Scatter";
import { cache_index } from "./data/index";
import { Container, SimpleGrid } from "@chakra-ui/react";
import { Footer } from "../../commons/Footer";
import { NavigationDrawer } from "../../commons/NavigationDrawer";

const Map: React.FC<{ conversation_name: string }> = ({
  conversation_name,
}) => {
  const data = cache_index[conversation_name]!;

  const pca = JSON.parse(data.participation_init.pca);
  return (
    <div>
      <SectionHeading>{data.title}</SectionHeading>
      <Scatter
        pca={pca}
        me={{ x: 0, y: 0 }}
        naming={data.naming}
        famous={data.famous}
        date={data.date}
        title={data.title}
        show_description={false}
      />
    </div>
  );
};
export const TiledPage: NextPage = ({}) => {
  return (
    <div>
      {/* <Center as="main" w="100%" p="0" m="0" flexDirection="column"> */}
      <Container maxW="container.lg" my="6" borderRadius={[0, 0, 0, 9]}>
        <SimpleGrid columns={3} spacing={8}>
          {[
            "keizai",
            "seijisikin",
            "kenpou",
            "syakaihosyou",
            "zeisei",
            "energy",
          ].map((conversation_name) => (
            <Map
              key={conversation_name}
              conversation_name={conversation_name}
            />
          ))}
        </SimpleGrid>
      </Container>
      {/* </Center> */}

      <Footer />
      <NavigationDrawer />
    </div>
  );
};
