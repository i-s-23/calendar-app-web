import React from "react";
import styled from "styled-components";
import { blue, red, pink } from "@material-ui/core/colors";
import { TableCell } from "@material-ui/core";

interface Props {
  wday: Number;
  isTargetMonth: Boolean;
  istargetday: boolean;
  children: any;
}

// Propsで扱っている情報を引数として日付として取得し、表示用のstyled-componentsに格納
function CalendarTableCell(props: Props) {
  const { wday, isTargetMonth, istargetday, children, ...other } = props;
  return (
    <StyleTableCell wday={props.wday} isTargetMonth={props.isTargetMonth} istargetday={props.istargetday}>
      {props.children}
    </StyleTableCell>
  );
}

// 引数に応じてCellの色を変化させる。対象月、本日、土日と平日などで色分け
const StyleTableCell = styled(TableCell)<{ wday: Number; isTargetMonth: Boolean; istargetday: Boolean }>`
  text-align: center;
  color: ${({ wday, isTargetMonth }): string => {
    if (isTargetMonth) {
      switch (wday) {
        case 0: // Sunday
          return red[500];
        case 6: // Saturday
          return blue[500];
        default:
          return "black";
      }
    } else {
      // previous or next month
      switch (wday) {
        case 0: // Sunday
          return red[200];
        case 6: // Saturday
          return blue[200];
        default:
          return "black";
      }
    }
  }};
  background: ${(istargetday): string => (istargetday ? pink[50] : blue[500])};
`;

export default CalendarTableCell;
