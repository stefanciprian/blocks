import { createContext, useContext } from 'react';
import { GenerateApp, GetSelectedApp, SelectFolder } from '../../../wailsjs/go/main/App';
import { App } from '@/src/types/App';


interface OverviewContextType {
    selectFolder: () => Promise<string | null>,
    generateApp: (app: App) => Promise<void>,
    getSelectedApp: () => Promise<any>,
}

const OverviewContext = createContext<OverviewContextType>({} as OverviewContextType);

export function OverviewProvider({ children }: any) {

    const getSelectedApp = async () => {
        const app = await GetSelectedApp();
        console.log('Selected app:', app);
        return app;
    }

    const generateApp = async (app: App) => {
        console.log('Generate app:', app);
        // Use the app as needed in your application
        try {
            const result = await GenerateApp(JSON.stringify(app));
            console.log('Generated app:', result);
        } catch (error) {
            console.error('Error generating app:', error);
        }
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
        generateApp,
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