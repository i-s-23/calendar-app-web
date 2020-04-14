import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import Calender from "./components/calender";

// Title コンポーネントの作成、中身は h1 タグにスタイルを適応したもの
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const App: React.FC = () => {
  return (
    <div>
      <Title>START</Title>
      <Calender />
    </div>
  );
};

export default App;
