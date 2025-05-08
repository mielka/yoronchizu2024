import type { NextPage } from "next";
import { ParticipationInit, Cache } from "./types";
import { useEffect, useState } from "react";
import { SectionHeading } from "../../commons/SectionHeading";
import { Scatter } from "./Scatter";
import { cache_index } from "./data/index";
import { Container, SimpleGrid } from "@chakra-ui/react";
import { Footer } from "../../commons/Footer";
import { NavigationDrawer } from "../../commons/NavigationDrawer";

export const getTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 月は0から始まるので+1
  const day = String(now.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const Map: React.FC<{ conversation_name: string }> = ({
  conversation_name,
}) => {
  const [data, setData] = useState<Cache>(cache_index[conversation_name]!);
  const conversation_id = data!.conversation_id!;
  const polis_api_host = `/api/polis/handler?apiUrl=https://polis.example.com/api`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          `${polis_api_host}/v3/participationInit?conversation_id=${conversation_id}&pid=mypid&lang=acceptLang`,
          {
            credentials: "include",
          }
        );
        const participation_init: ParticipationInit = await response1.json();

        const cache = cache_index[conversation_name]!;
        const data: Cache = {
          participation_init,
          comments: cache.comments,
          conversation_id,
          title: cache.title!,
          famous: cache.famous!,
          date: getTodayDate(),
        };

        setData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [conversation_name, conversation_id, polis_api_host]);

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
export const RealtimePage: NextPage = ({}) => {
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
