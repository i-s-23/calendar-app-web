// src/components/calendarTableCell.test.tsx
import { render, screen } from "@testing-library/react";
import CalendarTableCell from "./calendarTableCell";
import React from "react";
import { blue, red } from "@mui/material/colors"; // スタイルの色を比較するためにインポート

describe("CalendarTableCell component", () => {
  // Test case 1: 平日（対象月）のレンダリングをテスト
  test("renders weekday in target month with black color", () => {
    // CalendarTableCellをレンダリングします。wday=1（月曜日）、isTargetMonth=true
    render(
      <CalendarTableCell wday={1} isTargetMonth={true} istargetday={false}>
        15
      </CalendarTableCell>
    );
    // '15'というテキストが表示されていることを確認します。
    expect(screen.getByText("15")).toBeInTheDocument();
    // テキストの色が黒であることを確認します。
    expect(screen.getByText("15")).toHaveStyle('color: rgb(0, 0, 0)');
  });

  // Test case 2: 日曜日（対象月）のレンダリングをテスト
  test("renders Sunday in target month with red color", () => {
    // CalendarTableCellをレンダリングします。wday=0（日曜日）、isTargetMonth=true
    render(
      <CalendarTableCell wday={0} isTargetMonth={true} istargetday={false}>
        14
      </CalendarTableCell>
    );
    // '14'というテキストが表示されていることを確認します。
    expect(screen.getByText("14")).toBeInTheDocument();
    // テキストの色がred[500]であることを確認します。
    expect(screen.getByText("14")).toHaveStyle('color: rgb(244, 67, 54)');
  });

  // Test case 3: 土曜日（対象月）のレンダリングをテスト
  test("renders Saturday in target month with blue color", () => {
    // CalendarTableCellをレンダリングします。wday=6（土曜日）、isTargetMonth=true
    render(
      <CalendarTableCell wday={6} isTargetMonth={true} istargetday={false}>
        16
      </CalendarTableCell>
    );
    // '16'というテキストが表示されていることを確認します。
    expect(screen.getByText("16")).toBeInTheDocument();
    // テキストの色がblue[500]であることを確認します。
    expect(screen.getByText("16")).toHaveStyle('color: rgb(33, 150, 243)');
  });

  // Test case 4: 平日（対象外月）のレンダリングをテスト
  test("renders weekday not in target month with black color", () => {
    // CalendarTableCellをレンダリングします。wday=1（月曜日）、isTargetMonth=false
    render(
      <CalendarTableCell wday={1} isTargetMonth={false} istargetday={false}>
        1
      </CalendarTableCell>
    );
    // '1'というテキストが表示されていることを確認します。
    expect(screen.getByText("1")).toBeInTheDocument();
    // テキストの色がblackであることを確認します。
    expect(screen.getByText("1")).toHaveStyle('color: rgb(0, 0, 0)');
  });

  // Test case 5: 日曜日（対象外月）のレンダリングをテスト
  test("renders Sunday not in target month with red[200] color", () => {
    // CalendarTableCellをレンダリングします。wday=0（日曜日）、isTargetMonth=false
    render(
      <CalendarTableCell wday={0} isTargetMonth={false} istargetday={false}>
        31
      </CalendarTableCell>
    );
    // '31'というテキストが表示されていることを確認します。
    expect(screen.getByText("31")).toBeInTheDocument();
    // テキストの色がred[200]であることを確認します。
    expect(screen.getByText("31")).toHaveStyle('color: rgb(239, 154, 154)');
  });

  // Test case 6: 土曜日（対象外月）のレンダリングをテスト
  test("renders Saturday not in target month with blue[200] color", () => {
    // CalendarTableCellをレンダリングします。wday=6（土曜日）、isTargetMonth=false
    render(
      <CalendarTableCell wday={6} isTargetMonth={false} istargetday={false}>
        6
      </CalendarTableCell>
    );
    // '6'というテキストが表示されていることを確認します。
    expect(screen.getByText("6")).toBeInTheDocument();
    // テキストの色がblue[200]であることを確認します。
    expect(screen.getByText("6")).toHaveStyle('color: rgb(144, 202, 249)');
  });
});
