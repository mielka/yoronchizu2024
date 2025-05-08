import type { NextPage } from "next";
import {
  Comment,
  PCA,
  ParticipationInit,
  PolisProps,
  VoteHistory,
  Cache,
} from "./types";
import { useEffect, useState } from "react";
import { VoteProcessNonRealtime } from "./VoteProcessNonRealtime";
import { VoteProcessRealtime } from "./VoteProcessRealtime";
import { PrintCache } from "./PrintCache";
import { SectionHeading } from "../../commons/SectionHeading";
import { arrayToObject, votes_to_pca } from "./voteHistoryUtil";
import GroupInfo from "./GroupInfo";
import { Scatter } from "./Scatter";
import { cache_index } from "./data/index";
import Head from "next/head";
import { Header } from "../../commons/Header";
import { Box, Center, Container, VStack } from "@chakra-ui/react";
import { getAssetsPath } from "../../../utils/getAssetPath";
import { MenuNavigation } from "../../commons/MenuNavigation";
import { Footer } from "../../commons/Footer";
import { NavigationDrawer } from "../../commons/NavigationDrawer";
import { Consensus } from "./Consensus";
import { TopicSelect } from "./TopicSelect";
import { LinksToOtherService } from "./LinksToOtherService";
import { exportSVG } from "./exportSVG";

function shuffleArray<T>(array: T[]): T[] {
  console.log("shuffleArray");
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
}

export const PolisPage: NextPage<PolisProps> = ({
  is_realtime,
  to_show_data,
  conversation_id,
  conversation_name,
}) => {
  const [data, setData] = useState<Cache | undefined>(
    cache_index[conversation_name]
  );
  const [voteHistory, setVoteHistory] = useState<VoteHistory>({});
  const [mePosition, setMePosition] = useState({ x: 0, y: 0 });
  const polis_api_host = `/api/polis/handler?apiUrl=https://polis.example.com/api`;

  const to_shuffle = data?.shuffle;
  useEffect(() => {
    // shuffleがtrueの場合、コメントをシャッフルする
    if (to_shuffle === true) {
      setData((data) => {
        if (data) {
          return { ...data, comments: shuffleArray(data.comments) };
        }
        return data;
      });
    }
  }, [to_shuffle]);

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

        const response2 = await fetch(
          `${polis_api_host}/v3/comments?conversation_id=${conversation_id}&include_social=true&translate=true&lang=ja`,
          {
            credentials: "include",
          }
        );
        const comments: Comment[] = await response2.json();

        const data: Cache = {
          participation_init,
          comments,
          conversation_id,
        };
        const cache = cache_index[conversation_name];
        if (cache) {
          if (cache.title) data.title = cache.title;
          if (cache.famous) data.famous = cache.famous;
          if (cache.shuffle) data.shuffle = cache.shuffle;
          // クラスタが変わる可能性があるからデフォルトでは入れるべきではないが、show_dataまでついていればデータ更新作業中なので入れる
          if (cache.naming && to_show_data) data.naming = cache.naming;
        }

        console.log("set data from API result");
        setData(data);

        if (is_realtime) {
          setVoteHistory(arrayToObject(participation_init.votes));
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    if (is_realtime) {
      console.log("fetch data");
      fetchData();
    }
    //  else {
    //   console.log("set data from cache");
    //   setData(cache_index[conversation_name]!);
    // }
  }, [
    conversation_name,
    conversation_id,
    is_realtime,
    polis_api_host,
    to_show_data,
  ]);

  useEffect(() => {
    if (data?.participation_init) {
      const pca: PCA = data.participation_init.pca
        ? JSON.parse(data.participation_init.pca)
        : null;
      const t = votes_to_pca(pca, voteHistory);
      if (t) {
        setMePosition(t);
      }
    }
  }, [voteHistory, data]);

  const pca: PCA = data?.participation_init.pca
    ? JSON.parse(data.participation_init.pca)
    : null;

  useEffect(() => {
    window.polis ||= {};
    window.polis.exportSVG = () => {
      exportSVG({
        title: data?.title ?? "",
        conversation_name: conversation_name,
        date: "2021-10-18",
        n: pca?.n,
      });
    };
  }, [data, conversation_name, pca]);

  if (!data) {
    console.log("no data, return loading");
    return <div>Loading...</div>;
  }

  const addVoteHistory = (tid: number, vote: number) => {
    setVoteHistory({ ...voteHistory, [tid]: vote });
  };

  // console.log({ is_realtime });
  const vote_process = is_realtime ? (
    <VoteProcessRealtime
      polis_api_proxy_path={polis_api_host}
      conversation_id={conversation_id}
      addVoteHistory={addVoteHistory}
      givenNextComment={
        (data.participation_init as ParticipationInit).nextComment
      }
    />
  ) : (
    <VoteProcessNonRealtime
      polis_api_proxy_path={polis_api_host}
      conversation_id={conversation_id}
      addVoteHistory={addVoteHistory}
      comments={data.comments}
      start={0}
    />
  );

  const ogp_title = data.title
    ? `${data.title} - 世論地図(β版) - JAPAN CHOICE`
    : `世論地図(β版) - JAPAN CHOICE`;
  const ogp_description = "新しい時代の民主主義の実験場「世論地図」";
  return (
    <div>
      <Head>
        <title>{ogp_title}</title>
        <meta name="description" content={ogp_title} />
        <link rel="icon" href={getAssetsPath("/favicon.ico")} />

        <meta property="og:title" content={ogp_title} />
        <meta property="og:description" content={ogp_description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`http://localhost:3000/polis/${conversation_name}`}
        />
        <meta property="og:site_name" content={ogp_title} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={ogp_title} />
        <meta name="twitter:description" content={ogp_description} />
      </Head>
      <Header
        Tool={
          <Box w="350px;">
            <MenuNavigation />
          </Box>
        }
      />

      <Center as="main" w="100%" p="0" m="0" flexDirection="column">
        <Container maxW="container.md" my="6" borderRadius={[0, 0, 0, 9]}>
          <VStack spacing={8} align="stretch">
            <VStack spacing={2} align="stretch">
              <SectionHeading>
                「{data.title}」についてのあなたの意見
              </SectionHeading>
              <div className="p-2 bg-gray-200 rounded-md text-center">
                <small>
                  あなたの意見をタップすると、あなたのアイコンが世論地図上でリアルタイムに動きます
                </small>
              </div>
              {vote_process}
            </VStack>
            <SectionHeading>
              「{data.title}」についての意見集団の可視化(世論地図)
            </SectionHeading>
            <Scatter
              pca={pca}
              me={mePosition}
              naming={data.naming}
              famous={data.famous}
              date={data.date}
              title={data.title}
              show_description={true}
            />
            <SectionHeading>世論地図の詳細解説</SectionHeading>
            <div className="p-2 m-2 bg-gray-200 rounded-md">
              <small>
                <strong>【データの見方/注意事項】</strong>
                <br />
                世論地図の意見集団の特徴を元に、AI🤖が意見集団の名前と解説を生成しました。AIも間違えることがあります。またこの解説も質問に答えるユーザが増えることで更新されていく予定です。
              </small>
            </div>
            <GroupInfo
              pca={pca}
              comments={data.comments}
              naming={data.naming}
            />
            <Consensus pca={pca} comments={data.comments} />
            {to_show_data ? <PrintCache data={data} /> : null}

            <SectionHeading>他の世論地図を見る</SectionHeading>
            <TopicSelect />

            <SectionHeading>他のサービスを見る</SectionHeading>
            <LinksToOtherService />
          </VStack>
        </Container>
      </Center>

      <Footer />
      <NavigationDrawer />
    </div>
  );
};
