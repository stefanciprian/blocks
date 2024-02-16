import { createContext, useContext } from 'react';
import { GetSelectedApp, SelectFolder } from '../../../wailsjs/go/main/App';


interface OverviewContextType {
    selectFolder: () => Promise<string | null>,
    getSelectedApp: () => Promise<any>,
}

const OverviewContext = createContext<OverviewContextType>({} as OverviewContextType);

export function OverviewProvider({ children }: any) {

    const getSelectedApp = async () => {
        const app = await GetSelectedApp();
        console.log('Selected app:', app);
        return app;
    }

    const selectFolder = async () => {
        try {
            const path = await SelectFolder();
            console.log('Selected folder path:', path);
            return path;
            // Use the path as needed in your application
        } catch (error) {
            console.error('Error selecting folder:', error);
            return null;
        }
    };

    const contextValue = {
        getSelectedApp,
        selectFolder,
    }

    return (
        <OverviewContext.Provider value={contextValue}>
            {children}
        </OverviewContext.Provider>
    )
}

export function useOverviewContext() {
    const context = useContext(OverviewContext);

    return context;
}