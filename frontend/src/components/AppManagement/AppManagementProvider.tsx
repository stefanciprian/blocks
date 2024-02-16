import { createContext, useContext } from 'react';
import {App} from '../../types/App';
import { GetApps, InsertApp } from '../../../wailsjs/go/main/App';


interface AppManagementContextType {
    getApps: () => Promise<App[]>,
    createApp: (app: string) => Promise<void>,
}

const AppManagementContext = createContext<AppManagementContextType>({} as AppManagementContextType);

export function AppManagementProvider({ children }: any) {
    const getApps = async () => GetApps();
    const createApp = async (appJsonSTring: string) => InsertApp(appJsonSTring);

    const contextValue = {
        getApps,
        createApp,
    }

    return (
        <AppManagementContext.Provider value={contextValue}>
            {children}
        </AppManagementContext.Provider>
    )
}

export function useAppManagementContext() {
    const context = useContext(AppManagementContext);

    return context;
}