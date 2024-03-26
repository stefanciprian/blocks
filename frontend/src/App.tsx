import './App.css';
import { Tabs, Box } from '@radix-ui/themes';
import { AppManagement } from './components/AppManagement/AppManagement';
import { Overview } from './components/Overview/Overview';
import { Settings } from './components/Settings/Settings';
import { Toaster } from './components/ui/toaster';
import { AppManagementProvider } from './components/AppManagement/AppManagementProvider';
import { OverviewProvider } from './components/Overview/OverviewProvider';
import { SettingsProvider } from './components/Settings/SettingsProvider';
import {
    QueryClient, QueryClientProvider,
} from 'react-query'
import { Notion } from './components/Notion/Notion';
import { NotionProvider } from './components/Notion/NotionProvider';

// Create a client
const queryClient = new QueryClient()

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <div id="App">
                <Tabs.Root defaultValue="notion">
                    <Tabs.List>
                        <Tabs.Trigger value="notion">Notion</Tabs.Trigger>
                        <Tabs.Trigger value="app-management">App Management</Tabs.Trigger>
                        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                    </Tabs.List>

                    <Box px="4" pt="3" pb="2">
                        <Tabs.Content value="notion">
                            <NotionProvider>
                                <Notion />
                            </NotionProvider>
                        </Tabs.Content>
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
        </QueryClientProvider>
    )
}

export default App
