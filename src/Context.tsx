
import React, { useState, useEffect, ReactNode } from "react";

const Context = React.createContext({});

interface Props {
  children?: ReactNode;
}

function ContextProvider({ children }: Props) {
    const defaultUrl =
      "https://opentdb.com/api.php?amount=10&category=0&difficulty=0&type=0";

  const [questions, setQuestions] = useState([]);
  const [apiUrl, setApiUrl] = useState(defaultUrl);


    async function generateQuestions() {
      const res = await fetch(apiUrl);
      const data = await res.json();

      let questionData = data.results.map((question: any) => {
        return {
          ...question,
          selected: false,
        };
      });
      setQuestions(questionData);
      
    }


  return (
    <Context.Provider
      value={{
        questions,
        generateQuestions,
        apiUrl,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };