# Playwright Scripts for Initializing Political Party Data

このディレクトリには、Playwrightを使用してブラウザ自動化を行い、政党の初期データを作成するためのスクリプトが含まれています。

## 概要

このプロジェクトは、Playwrightを利用してブラウザ操作を自動化し、政党のデータを効率的に初期化することを目的としています。これにより、手動でのデータ入力の手間を省き、正確で一貫性のあるデータセットを提供します。

## ファイル一覧と役割

### data.ts

データとして使用しています。これは非エンジニアを含むメンバーによってGoogle Spreadsheet上で作成・レビューされたものを、エンジニアがコピーペーストして使えるように設計されています。下記のスクリプトからimportされます。

### seed_comments.test.ts

投票対象のseed commentsを用意します。

### vote.test.ts

このスクリプトは、Playwrightを使用して投票データを自動化するためのものです。データを整形し、ページ上のボタンをクリックする操作を行います。

## 使用方法

このプロジェクトでは、Spreadsheetからデータを取得し、Conversationを作成して投票を行い、政党ベクトルデータを生成する手順を以下に示します。

1. **Spreadsheetからデータを取得**

   - 本番Spreadsheetからタイトル、コメント、政党データを`data.ts`に記述します。

2. **Conversationの作成**

   - ターミナルで以下のコマンドを実行します。これは新しいconversationを作成して、投票対象となるseed commentsを準備します。
     ```
     cd scripts/polis/playwright-scripts
     npx playwright test tests/seed_comments.test.ts
     ```
   - 表示されたURLをクリックし、`visualization`がONであることを確認し、`conversation_id`を確認します。
   - ローカルのサーバで開きます: `https://localhost:3000/polis/<conversation_id>?show_data=true`
   - このタブは開いたままにしておきます（以下、(A)とします）。

3. ## **Cacheデータのコピー**

   - ローカルサーバがPolisサーバから読み込んだデータが表示されているはずです
   - それを`data/tmp.ts`に上書きします。これで投票が可能になります。
   - 投票可能な画面はこうなります: `https://localhost:3000/polis/tmp`

4. **投票の実行**

   - 以下のコマンドを実行して投票を行います。
     ```
     npx playwright test tests/vote.test.ts
     ```

5. **政党ベクトルデータの作成**

   - 以下のコマンドを実行し、結果をクリップボードにコピーします。
     ```
     deno run tests/show_party_data.ts | pbcopy
     ```
   - `tmp.ts`に`famous: <paste>`として貼り付けます。

6. **可視化の確認**

   - (A)をリロードします。可視化が表示されるはずです。表示されない場合は、時間がかかっているだけなので、1分ほど待ちます。
   - Cacheデータをコピーして`tmp`のデータを更新します。

7. **AI解説の作成**
   - 以下のURLにアクセスし、ChatGPTのカスタムGPTを用いてAIによる解説を作成します。
     - [AI解説作成リンク](https://chatgpt.com/g/g-h15rqoZlE-polis-cluster-naming/c/670e1156-9054-8011-b9c8-08870e02a156)

この手順に従って、プロジェクトのConversation作成とデータ処理を行ってください。
