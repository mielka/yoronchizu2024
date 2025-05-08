import { Box, Center, Container, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { FC } from "react";
import { getAssetsPath } from "../../../utils/getAssetPath";
import { Footer } from "../../commons/Footer";
import { Header } from "../../commons/Header";
import { MenuNavigation } from "../../commons/MenuNavigation";
import { NavigationDrawer } from "../../commons/NavigationDrawer";
import { SectionHeading } from "../../commons/SectionHeading";
import { PolisServiceHeader } from "./PolisServiceHeader";
import { TopicSelect } from "./TopicSelect";

export interface PolisProps {}

export const Polis: FC<PolisProps> = () => {
  return (
    <div>
      <Head>
        <title>世論地図(β版) - JAPAN CHOICE</title>
        <meta name="description" content="世論地図(β版) - JAPAN CHOICE" />
        <link rel="icon" href={getAssetsPath("/favicon.ico")} />

        <meta property="og:title" content={"世論地図(β版) - JAPAN CHOICE"} />
        <meta
          property="og:description"
          content={"新しい時代の民主主義の実験場「世論地図」"}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`http://localhost:3000/polis/`} />
        <meta property="og:site_name" content="世論地図(β版) - JAPAN CHOICE" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="世論地図(β版) - JAPAN CHOICE" />
        <meta
          name="twitter:description"
          content="新しい時代の民主主義の実験場「世論地図」"
        />
      </Head>
      <Header
        Tool={
          <Box w="350px;">
            <MenuNavigation />
          </Box>
        }
      />
      <Center as="main" w="100%" p="0" m="0" flexDirection="column">
        <Container maxW="container.md" my="14" borderRadius={[0, 0, 0, 9]}>
          <VStack spacing={8} align="stretch">
            <PolisServiceHeader />

            <SectionHeading>意見を見たいトピックを選択する</SectionHeading>
            <TopicSelect />
          </VStack>
        </Container>
      </Center>

      <Footer />
      <NavigationDrawer />
    </div>
  );
};
