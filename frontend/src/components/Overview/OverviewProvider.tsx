import { createContext, useContext } from 'react';
import { GenerateApplication, GetSelectedApplication, SelectFolder } from '../../../wailsjs/go/main/App';
import { Application } from '@/src/types/Application';


interface OverviewContextType {
    selectFolder: () => Promise<string | null>,
    generateApplication: (app: Application) => Promise<void>,
    getSelectedApplication: () => Promise<any>,
}

const OverviewContext = createContext<OverviewContextType>({} as OverviewContextType);

export function OverviewProvider({ children }: any) {

    const getSelectedApplication = async () => {
        const application = await GetSelectedApplication();
        console.log('Selected application:', application);
        return application;
    }

    const generateApplication = async (application: Application) => {
        console.log('Generate application:', application);
        // Use the application as needed in your application
        try {
            const result = await GenerateApplication(JSON.stringify(application));
            console.log('Generated application:', result);
        } catch (error) {
            console.error('Error generating application:', error);
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
        getSelectedApplication,
        generateApplication,
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