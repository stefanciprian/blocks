

import { createContext, useContext } from 'react';


interface NotionContextType {
}

const NotionContext = createContext<NotionContextType>({} as NotionContextType);

export function NotionProvider({ children }: any) {


    const contextValue = {
    }

    return (
        <NotionContext.Provider value={contextValue}>
            {children}
        </NotionContext.Provider>
    )
}

export function useNotionContext() {
    const context = useContext(NotionContext);

    return context;
}