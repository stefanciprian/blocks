

import { GetNotionDatabase, GenerateCSVFromNotionDatabase } from '../../../wailsjs/go/main/App';
import { createContext, useContext } from 'react';


interface NotionContextType {
    getNotionDatabase: (secretKey: string, databaseId: string) => Promise<any>,
    generateCSVFromNotionDatabase: (databaseJsonString: string) => Promise<void>
}

const NotionContext = createContext<NotionContextType>({} as NotionContextType);

export function NotionProvider({ children }: any) {
    const getNotionDatabase = async (secretKey: string, databaseId: string) => GetNotionDatabase(secretKey, databaseId);
    const generateCSVFromNotionDatabase = async (databaseJsonString: string) => GenerateCSVFromNotionDatabase(databaseJsonString);

    const contextValue = {
        getNotionDatabase,
        generateCSVFromNotionDatabase
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