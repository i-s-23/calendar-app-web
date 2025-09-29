# ベースとするDockerImage
FROM node:24.9-bookworm
WORKDIR /usr/app
# パッケージの依存関係に関するファイルをホストからDocker内にコピー
COPY package.json yarn.lock tsconfig.json ./
# yarn install する
RUN yarn
# yarn install 後、全ファイルをコピーすることで、パッケージ関連がコピーされ、キャッシュが効くようになり高速化
COPY . .
CMD [ "yarn", "start" ]
