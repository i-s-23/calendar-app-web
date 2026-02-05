import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 開発サーバーに関する設定
  server: {
    // サーバーがリッスンするIPアドレスを指定します。
    // '0.0.0.0'またはtrueに設定すると、ローカルネットワーク内の他のデバイス（Dockerコンテナなど）からのアクセスを許可します。
    host: "0.0.0.0",
    // HMR (Hot Module Replacement) の設定
    hmr: {
      // HMRクライアントが接続するポート番号を明示的に指定します。
      // Dockerなどのコンテナ環境でポートフォワーディングを使用している場合に必要です。
      clientPort: 5173,
    },
  },
});
