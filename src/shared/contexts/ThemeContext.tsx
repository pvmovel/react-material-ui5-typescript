import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { ThemeProvider, Box } from '@mui/material';

import { DarkTheme, LightTheme } from '../themes';

interface IThemeContextData {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

interface IAppThemeProviderProps {
  children: ReactNode
}

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};


export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {

  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
  }, []);

  const theme = useMemo(() => {
    if(themeName === 'light') return LightTheme;

    return DarkTheme;
  }, [themeName]);


  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width="100vw" height="100vw" bgcolor={theme.palette.background.default}>
          { children }
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

