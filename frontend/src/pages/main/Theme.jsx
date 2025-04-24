
import { createContext, useState } from "react";

const Theme = createContext();


export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(false); 
  
  return (
    <Theme.Provider value={{ mode, setMode }}>
      {children}
    </Theme.Provider>
  );
};

export default Theme;
