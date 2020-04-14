import React, { useState } from "react";
import format from "date-fns/format";
import getDate from "date-fns/getDate";
import getDay from "date-fns/getDay";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import endOfWeek from "date-fns/endOfWeek";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// Material-UI をカッコで囲んで、styled の引数にしてやる
const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;

const getCalendarArray = (date: Date): Date[][] => {
  const sundays = eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date)
  });
  return sundays.map(sunday =>
    eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) })
  );
};

const calendar: React.FC = () => {
  const [targetDate, setTargetDate] = useState(new Date());

  const oneMonth = getCalendarArray(targetDate);

  return (
    <div>
      <div>
        <StyledButton
          type="button"
          onClick={(): void => setTargetDate(current => subMonths(current, 1))}
        >
          前の月
        </StyledButton>
        <StyledButton
          type="button"
          onClick={(): void => setTargetDate(new Date())}
        >
          今月
        </StyledButton>
        <StyledButton
          type="button"
          onClick={(): void => setTargetDate(current => addMonths(current, 1))}
        >
          次の月
        </StyledButton>
      </div>
      {format(targetDate, "y年M月")}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>日</TableCell>
            <TableCell>月</TableCell>
            <TableCell>火</TableCell>
            <TableCell>水</TableCell>
            <TableCell>木</TableCell>
            <TableCell>金</TableCell>
            <TableCell>土</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {oneMonth.map((weekRow, rowNum) => (
            <TableRow key={rowNum.toString()}>
              {weekRow.map(date => (
                <TableCell key={getDay(date)}>{getDate(date)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default calendar;
