import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import { DarkTheme, LightTheme } from "../themes";

interface IThemeContextData {
  themeName: 'light' | 'dark';
  togleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

interface IAppThemeProviderProps {
  children: ReactNode
}

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
}


export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {

  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const togleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
  }, []);

  const theme = useMemo(() => {
    if(themeName === 'light') return LightTheme;

    return DarkTheme
  }, [themeName]);


  return (
    <ThemeContext.Provider value={{ themeName, togleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width="100vw" height="100vw" bgcolor={theme.palette.background.default}>
          { children }
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

