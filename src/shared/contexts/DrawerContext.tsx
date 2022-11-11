import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface IDrawerOption {
  icon: string;
  path: string;
  label: string;
}
interface IDwawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: IDrawerOption[];
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

const DrawerContext = createContext({} as IDwawerContextData);

interface IDrawerProviderProps {
  children: ReactNode
}

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider value={{ 
      isDrawerOpen, 
      drawerOptions, 
      toggleDrawerOpen, 
      setDrawerOptions: handleSetDrawerOptions
    }}>
      { children }
    </DrawerContext.Provider>
  );
};

