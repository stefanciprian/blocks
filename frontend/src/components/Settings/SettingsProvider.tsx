import { Setting } from '@/src/types/Setting';
import { CheckNodeJS, UpdateSetting } from '../../../wailsjs/go/main/App';
import { createContext, useContext } from 'react';



interface SettingsContextType {
    checkNodeJS: () => Promise<any>,
    updateSetting: (settingJsonString: string) => Promise<void>,
}

const SettingsContext = createContext<SettingsContextType>({} as SettingsContextType);

export function SettingsProvider({ children }: any) {

    const checkNodeJS = async () => {
        try {
            const response = await CheckNodeJS();
            console.log('Node.js check response:', response);
            return response;
        } catch (error) {
            console.error('Error checking Node.js:', error);
            return null;
        }
    }

    const updateSetting = async (settingJsonString: string) => UpdateSetting(settingJsonString);


    const contextValue = {
        checkNodeJS,
        updateSetting,
    }

    return (
        <SettingsContext.Provider value={contextValue}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettingsContext() {
    const context = useContext(SettingsContext);

    return context;
}