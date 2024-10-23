import React, { createContext, useState } from "react";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, setState] = useState("All");

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
