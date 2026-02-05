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

    // '日', '月', '火', '水', '木', '金', '土' のいずれかのテキストを持つ要素がドキュメント内に存在するかを確認します。
    // これはCalendarコンポーネントの曜日表示の一部であり、Calendarコンポーネントがレンダリングされていることを確認します。
    // getByTextは厳密なマッチングを行うため、いずれかの曜日が存在すればOKとします。
    expect(screen.getByText(/日|月|火|水|木|金|土/)).toBeInTheDocument();
  });
});
