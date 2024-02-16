import './App.css';
import { Tabs, Box } from '@radix-ui/themes';
import { AppManagement } from './components/AppManagement/AppManagement';
import { Overview } from './components/Overview/Overview';
import { Settings } from './components/Settings/Settings';
import { Toaster } from './components/ui/toaster';
import { AppManagementProvider } from './components/AppManagement/AppManagementProvider';
import { OverviewProvider } from './components/Overview/OverviewProvider';
import { SettingsProvider } from './components/Settings/SettingsProvider';

function App() {

    return (
        <div id="App">
            <Tabs.Root defaultValue="app-management">
                <Tabs.List>
                    <Tabs.Trigger value="app-management">App Management</Tabs.Trigger>
                    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                </Tabs.List>

                <Box px="4" pt="3" pb="2">
                    <Tabs.Content value="app-management">
                        <AppManagementProvider>
                            <AppManagement />
                        </AppManagementProvider>
                    </Tabs.Content>

                    <Tabs.Content value="overview">
                        <OverviewProvider>
                            <Overview />
                        </OverviewProvider>
                    </Tabs.Content>

                    <Tabs.Content value="settings">
                        <SettingsProvider>
                            <Settings />
                        </SettingsProvider>
                    </Tabs.Content>
                </Box>
            </Tabs.Root>
            <Toaster />
        </div>
    )
}

export default App
