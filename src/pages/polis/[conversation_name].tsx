import type { GetServerSideProps } from "next";
import { Cache, PolisProps } from "../../components/pages/polis/types";
import { cache_index } from "../../components/pages/polis/data/index";
import { PolisPage } from "../../components/pages/polis/PolisPage";

export const getServerSideProps: GetServerSideProps<PolisProps> = async (
  context
) => {
  // パラメータの取り出し
  const s = context.query.conversation_name;
  const conversation_name: string = typeof s === "string" ? s : s?.[0] || "";
  const is_realtime: boolean = context.query.realtime === "true";
  const to_show_data: boolean = context.query.show_data === "true";
  const cache: Cache | undefined = cache_index[conversation_name];

  const conversation_id: string = cache
    ? cache.conversation_id ?? ""
    : conversation_name;

  // console.log({ cache: !!cache, is_realtime });
  if (cache && !is_realtime) {
    // console.log("use cache");
    return {
      props: {
        is_realtime,
        conversation_name,
        conversation_id,
        to_show_data,
      },
    };
  }

  return {
    props: {
      is_realtime: true,
      conversation_name,
      conversation_id,
      to_show_data,
    },
  };
};

export default PolisPage;
