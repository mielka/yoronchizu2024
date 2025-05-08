import type { NextApiRequest, NextApiResponse } from "next";

// 許可する送信先 API のリスト
const allowedApiDomains = ["https://polis.example.com"];

// アクセス許可するオリジンのリスト
const allowedWhiteList = ["http://localhost:3000"];

// CORS ヘッダーを設定するためのヘルパー関数
function setCorsHeaders(req: NextApiRequest, res: NextApiResponse) {
  const origin = req.headers.origin;
  if (origin && allowedWhiteList.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // OPTIONS メソッドに対する処理（CORS プリフライトリクエストの対応）
  if (req.method === "OPTIONS") {
    setCorsHeaders(req, res);
    res.status(200).end();
    return;
  }

  // CORS ヘッダーをセット
  setCorsHeaders(req, res);

  // ターゲット API の URL を決定
  const targetApiUrl = req.query.apiUrl as string;
  if (
    !targetApiUrl ||
    !allowedApiDomains.some((domain) => targetApiUrl.startsWith(domain))
  ) {
    res.status(400).json({ error: "Invalid or disallowed API URL" });
    return;
  }

  try {
    // サードパーティ API にリクエストを送る
    const method = req.method ?? "GET";
    const headers = {
      Cookie: req.headers.cookie ?? "",
      "Content-Type": "application/json",
    };
    const options: RequestInit = {
      method: method,
      headers: headers,
      credentials: "include",
    };
    if (method === "POST" && req.body) {
      options.body = JSON.stringify(req.body);
    }
    const apiResponse = await fetch(targetApiUrl, options);

    // サードパーティ API のレスポンスから Cookie を抽出して、フロントエンドに返す
    const cookies = apiResponse.headers.getSetCookie();
    if (cookies && cookies.length > 0) {
      // cookie から Domain 属性を削除
      const cleanedCookies = cookies.map((cookie) =>
        cookie.replace(/;\s*Domain=[^;]+/gi, "")
      );
      res.setHeader("Set-Cookie", cleanedCookies);
    }

    // サードパーティ API のレスポンスをフロントエンドにそのまま転送
    const data = await apiResponse.json();
    res.status(apiResponse.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from the API" });
  }
};

export default handler;
