// src/App.test.tsx
import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react"; // Explicitly import React for JSX

// describeブロックでテストスイートを定義します。
// ここでは'App component'という名前で関連するテストをグループ化します。
describe("App component", () => {
  // 'renders title and Calendar component'という名前でテストケースを定義します。
  // Appコンポーネントが正しくレンダリングされ、期待される要素が存在するかを確認します。
  test("renders title and Calendar component", () => {
    // Appコンポーネントをレンダリングします。
    render(<App />);

    // 'calendar-app-web'というテキストを持つ要素がドキュメント内に存在するかを確認します。
    // これはAppコンポーネントのタイトルです。
    expect(screen.getByText("calendar-app-web")).toBeInTheDocument();

    // カレンダーの曜日が表示されていることを確認します。
    // getByRole('columnheader')を使ってテーブルヘッダーのセル（<th>）を取得し、
    // それぞれの曜日のテキストが含まれていることを確認します。
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    weekdays.forEach(day => {
      expect(screen.getByRole("columnheader", { name: day })).toBeInTheDocument();
    });
  });
});
