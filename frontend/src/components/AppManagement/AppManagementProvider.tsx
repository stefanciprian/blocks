import { createContext, useContext } from 'react';
import { Application } from '../../types/Application';
import { GetApplications, InsertApplication } from '../../../wailsjs/go/main/App';


interface AppManagementContextType {
    getApplications: () => Promise<Application[]>,
    createApplication: (applicationJsonString: string) => Promise<void>,
}

const AppManagementContext = createContext<AppManagementContextType>({} as AppManagementContextType);

export function AppManagementProvider({ children }: any) {
    const getApplications = async () => GetApplications();
    const createApplication = async (applicationJsonString: string) => InsertApplication(applicationJsonString);

    const contextValue = {
        getApplications,
        createApplication,
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