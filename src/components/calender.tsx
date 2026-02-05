import React, { useState } from "react";
import {
  format,
  getDate,
  getDay,
  eachDayOfInterval,
  endOfWeek,
  eachWeekOfInterval,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isSameDay
} from "date-fns";
import styled from "styled-components";
import { Paper, Button, Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import CalendarTableCell from "./calendarTableCell";

// Material-UI のButtonをカッコで囲んで、styled の引数にしてCSS in JSを実現している.
const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;

const StyledPaper = styled(Paper)`
  margin: (5, 10);
  padding: (5, 5);
`;

const StyleTypography = styled(Typography)`
  text-align: center;
  margin: (2, 0, 1, 0);
`;

const StyleTableHeadCell = styled(TableCell)`
  text-align: center;
`;

// カレンダーに表示するための一月分のArrayを返す関数
const getCalendarArray = (date: Date): Date[][] => {
  const sundays = eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date)
  });
  return sundays.map((sunday: Date) => eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) }));
};

// カレンダーを表示するReactのFunctionComponent
const calendar: React.FC = () => {
  const [targetDate, setTargetDate] = useState(new Date());

  const oneMonth = getCalendarArray(targetDate);
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div>
      <StyledPaper>
        <Grid container justifyContent="space-between">
          <Grid>
            <StyledButton type="button" onClick={(): void => setTargetDate(current => subMonths(current, 1))}>
              前の月
            </StyledButton>
          </Grid>
          <Grid>
            <StyledButton type="button" onClick={(): void => setTargetDate(new Date())}>
              今月
            </StyledButton>
          </Grid>
          <Grid>
            <StyledButton type="button" onClick={(): void => setTargetDate(current => addMonths(current, 1))}>
              次の月
            </StyledButton>
          </Grid>
        </Grid>
        <StyleTypography>{format(targetDate, "y年M月")}</StyleTypography>
        <Table>
          <TableHead>
            <TableRow>
              {weekdays.map(day => (
                <StyleTableHeadCell key={day}>{day}</StyleTableHeadCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {oneMonth.map((weekRow, rowNum) => (
              <TableRow key={rowNum.toString()}>
                {weekRow.map(date => (
                  <CalendarTableCell
                    key={getDay(date)}
                    wday={getDay(date)}
                    isTargetMonth={isSameMonth(date, targetDate)}
                    istargetday={isSameDay(date, targetDate)}
                  >
                    {getDate(date)}
                  </CalendarTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledPaper>
    </div>
  );
};

export default calendar;