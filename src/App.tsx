import * as React from "react";
import { styled } from "@mui/material/styles";
import Calender from "./components/calender";

const Title = styled('h1')`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const App: React.FC = () => {
  return (
    <div>
      <Title>calendar-app-web</Title>
      <Calender />
    </div>
  );
};

export default App;
