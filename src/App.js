import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding:0;
    box-sizing: border-box;
  }
`;

const App = () => {
    return (
        <>
            {" "}
            <GlobalStyles />
            <h1>hello</h1>
        </>
    );
};

export default App;
