import { createContext, useContext } from 'react';
import { SelectFolder } from '../../../wailsjs/go/main/App';


interface OverviewContextType {
    selectFolder: () => Promise<string | null>,
}

const OverviewContext = createContext<OverviewContextType>({} as OverviewContextType);

export function OverviewProvider({ children }: any) {

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