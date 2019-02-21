# dakoku-script

## usage

### From CLI

npm run cli enter user_id password

or

npm run cli leave user_id password

### Web App (GAE)

npm start

## deploy

デプロイするときは [dakoku-web](https://github.com/its-succ/dakoku-web) 側でプロジェクトを用意しておき、その下のサービスとして登録します。

以下のようなコマンドを実行します。

```
gcloud app deploy --project `dakoku-webのプロジェクトID`
```
