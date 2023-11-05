import React, { createContext, useState } from "react";

export const HvxContext = createContext();

export const HvxContextProvider = ({ children }) => {
  const [exam, setExam] = useState({
    examId: 0,
    totalTime: 0,
    totalPoint: 0,
  });

  return (
    <HvxContext.Provider value={{ exam, setExam }}>
      {children}
    </HvxContext.Provider>
  );
};
