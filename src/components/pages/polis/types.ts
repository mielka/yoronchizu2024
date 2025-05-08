export type PCA = {
  n: number;
  pca: {
    comps: number[][];
    center: number[];
    "comment-extremity": number[];
    "comment-projection": number[][];
  };
  tids: number[];
  "mod-in": number[];
  "n-cmts": number;
  "in-conv": number[];
  "mod-out": number[];
  repness: {
    [key: string]: {
      tid: number;
      "p-test": number;
      "n-agree"?: number;
      repness: number;
      "n-trials": number;
      "n-success": number;
      "p-success": number;
      "best-agree"?: boolean;
      "repful-for": string;
      "repness-test": number;
    }[];
  };
  consensus: {
    agree: {
      tid: number;
      "p-test": number;
      "n-trials": number;
      "n-success": number;
      "p-success": number;
    }[];
    disagree: {
      tid: number;
      "p-test": number;
      "n-trials": number;
      "n-success": number;
      "p-success": number;
    }[];
  };
  "meta-tids": number[];
  "votes-base": {
    [key: string]: {
      A: number[];
      D: number[];
      S: number[];
    };
  };
  "group-votes": {
    [key: string]: {
      votes: {
        [key: string]: {
          A: number;
          D: number;
          S: number;
        };
      };
      "n-members": number;
      id: number;
    };
  };
  "base-clusters": {
    x: number[];
    y: number[];
    id: number[];
    count: number[];
    members: number[][];
  };
  "group-clusters": {
    id: number;
    center: number[];
    members: number[];
  }[];
  lastModTimestamp: number | null;
  "user-vote-counts": {
    [key: string]: number;
  };
  lastVoteTimestamp: number;
  "comment-priorities": {
    [key: string]: number;
  };
  "group-aware-consensus": {
    [key: string]: number;
  };
  math_tick: number;
};

export type Comment = {
  txt: string;
  tid: number;
  created: string;
  tweet_id: string | null;
  quote_src_url: string | null;
  is_seed: boolean;
  is_meta: boolean;
  lang: string | null;
  pid: number;
};

// API: /api/v3/votes?conversation_id=<>&pid=mypid
export interface VoteHistoryData {
  tid: number;
  vote: number;
}

export type Cache = {
  conversation_id: string | null;

  participation_init: {
    // これがinterface ParticipationInitと一致しないのは意図的、nextCommentをCacheするべきではないため
    pca: string;
    votes: VoteHistoryData[];
  };
  comments: Comment[];
  naming?: Naming;
  famous?: Famous[];
  title?: string;
  shuffle?: boolean;
  date?: string;
};
export type CacheIndex = {
  [conversation_name: string]: Cache;
};

interface NextComment {
  txt: string;
  tid: number;
  created: string;
  tweet_id?: string;
  quote_src_url?: string;
  is_seed: boolean;
  is_meta: boolean;
  lang?: string;
  pid: number;
  randomN: number;
  remaining: number;
  total: number;
  translations: string[];
}

export interface ParticipationInit {
  // ptpt?: string;
  nextComment: NextComment;
  pca: string;
  votes: VoteHistoryData[];
}

export interface VotesResponse {
  currentPid: number;
  nextComment?: NextComment;
}

// 次に表示するコメントの状態
export interface NextCommentState {
  txt: string;
  tid: number;
  remaining: number;
}

// 座標だけでなく、グループIDやbidも持つ
export interface ScatterPoint {
  gid: number;
  bid: number;
  x: number;
  y: number;
}

export type Naming = { [key: number]: { name: string; description: string } };
export type VoteHistory = { [key: number]: number };

export type Famous = {
  img: string;
  votes: VoteHistory | number[];
  size?: number;
};

export type VoteData = {
  agree: number;
  neutral: number;
  disagree: number;
};

export type PolisProps = {
  is_realtime: boolean;
  to_show_data: boolean;
  conversation_id: string; // example: "5ravw9jih8"
  conversation_name: string; // example: "kenpou"
};

export type Topic = {
  key: string;
  title: string;
};
