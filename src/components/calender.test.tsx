// src/components/calender.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Calender from "./calender";
import React from "react";
import { format, addMonths, subMonths } from "date-fns";

// Mock date-fns functions to control the date for consistent testing
// Vitestの`vi.mock`を使ってdate-fnsの特定の関数をモックします。
// これにより、テスト実行時の日付が常に一定になり、テストの安定性が向上します。
vi.mock("date-fns", async () => {
  // 元のdate-fnsモジュールをインポートします。
  const actual = await vi.importActual("date-fns");
  return {
    ...actual, // 元のdate-fnsの全ての関数をエクスポートします。
    // `new Date()`が呼ばれたときに常に2026年2月1日を返すようにモックします。
    // これにより、テスト中の「現在の日付」が固定されます。
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    __esModule: true,
    default: {
      ...actual,
      // `new Date()`の代わりに固定の日付を返すようにDateオブジェクトをモック
      Date: vi.fn(() => new Date(2026, 1, 1)),
    },
  };
});

describe("Calender component", () => {
  // 各テストケースの前にモックをリセットします。
  beforeEach(() => {
    vi.useFakeTimers(); // タイマーをモックする（Dateオブジェクトのモックと併用）
    vi.setSystemTime(new Date(2026, 1, 5)); // システム時間を固定する（2026年2月5日）
  });

  // 各テストケースの後にモックを元に戻します。
  afterEach(() => {
    vi.useRealTimers(); // タイマーのモックを解除
    vi.restoreAllMocks(); // 全てのモックを元に戻す
  });

  // テストケース1: コンポーネントが正しくレンダリングされ、現在の日付（月と年）が表示されるか
  test("renders current month and year", () => {
    render(<Calender />);
    // テスト実行時の現在の日付が2026年2月なので、その表示を期待します。
    expect(screen.getByText("2026年2月")).toBeInTheDocument();
  });

  // テストケース2: ナビゲーションボタン（前月、今月、次月）が存在するか
  test("renders navigation buttons", () => {
    render(<Calender />);
    expect(screen.getByRole("button", { name: "前の月" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "今月" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "次の月" })).toBeInTheDocument();
  });

  // テストケース3: 「前の月」ボタンをクリックすると、表示月が前月に変更されるか
  test("clicking 'Previous Month' button changes to previous month", () => {
    render(<Calender />);
    const prevMonthButton = screen.getByRole("button", { name: "前の月" });
    fireEvent.click(prevMonthButton); // ボタンをクリック

    // 2026年1月が表示されることを期待します。
    expect(screen.getByText("2026年1月")).toBeInTheDocument();
  });

  // テストケース4: 「次の月」ボタンをクリックすると、表示月が次月に変更されるか
  test("clicking 'Next Month' button changes to next month", () => {
    render(<Calender />);
    const nextMonthButton = screen.getByRole("button", { name: "次の月" });
    fireEvent.click(nextMonthButton); // ボタンをクリック

    // 2026年3月が表示されることを期待します。
    expect(screen.getByText("2026年3月")).toBeInTheDocument();
  });

  // テストケース5: 「今月」ボタンをクリックすると、表示月が現在の月に戻るか
  test("clicking 'Current Month' button resets to current month", () => {
    render(<Calender />);
    // まず次月に移動します。
    const nextMonthButton = screen.getByRole("button", { name: "次の月" });
    fireEvent.click(nextMonthButton);
    expect(screen.getByText("2026年3月")).toBeInTheDocument(); // 次月が表示されていることを確認

    // 「今月」ボタンをクリックします。
    const currentMonthButton = screen.getByRole("button", { name: "今月" });
    fireEvent.click(currentMonthButton);

    // 2026年2月（初期の現在月）に戻ることを期待します。
    expect(screen.getByText("2026年2月")).toBeInTheDocument();
  });
});
