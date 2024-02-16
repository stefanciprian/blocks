import { useToast } from '../ui/use-toast';
import { useOverviewContext } from './OverviewProvider';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { App } from '../../types/App';


export function Overview() {
    const [path, setPath] = useState('');
    const { selectFolder, generateApp, getSelectedApp } = useOverviewContext();
    const [selectedApp, setSelectedApp] = useState<App | null>(null);
    const { toast } = useToast();

    const handleFolderSelection = async () => {
        const path = await selectFolder();
        if (path === null) {
            console.log('No folder selected');
            toast({
                title: "Folder selected",
                description: `No folder selected. Please try again.`,
            })
            return;
        }
        console.log('Selected folder path:', path);
        setPath(path);
        if (selectedApp !== null) {
            const app: App = {
                ...selectedApp,
                path,
            }
            setSelectedApp(app);
        }
        toast({
            title: "Folder selected",
            description: `We have selected the folder for you.
            <pre>
            ${path}
            </pre>`,
        })
    }

    const handleGeneration = async () => {
        if (selectedApp === null) {
            toast({
                title: "No app selected",
                description: `Please select an app first.`,
            })
            return;
        }
        if (selectedApp.path === "N/A" || selectedApp.path === "") {
            toast({
                title: "No path selected",
                description: `Please select a path first.`,
            })
            return;
        }
        if (selectedApp.is_generated) {
            toast({
                title: "App already generated",
                description: `The app is already generated.`,
            })
            return;
        }
        await generateApp(selectedApp);
        toast({
            title: "Generating app",
            description: `We are generating the app for you.`,
        })
    }

    useEffect(() => {
        console.log('Path:', path);
        console.log('Select folder:', selectFolder);

        getSelectedApp().then((app) => {
            console.log('Selected app:', app);
            setSelectedApp(app);
        })
    }, [])

    return (
        <div className="hidden flex-col md:flex">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Generate app, add modules & configure them.</h2>
                    <div className="flex items-center space-x-2">
                    </div>
                </div>

                <h2 className="text-3xl font-bold tracking-tight">Selected app:</h2>
                {selectedApp === null ? <p>No app selected</p> : <p>{selectedApp?.id} {selectedApp?.name}</p>}

                <h2 className="text-3xl font-bold tracking-tight">Select path where the app should be located:</h2>

                <div className="flex items-center space-x-2">
                    <Input type="email" placeholder="Path" value={path} />
                    <Button disabled={selectedApp === null} onClick={handleFolderSelection}>Select</Button>
                </div>

                <h2 className="text-3xl font-bold tracking-tight">Generate app:</h2>
                <div className="flex items-center space-x-2">
                    <Button disabled={
                        (selectedApp !== null) &&
                        (selectedApp.path !== ("N/A" || ""))
                        && selectedApp.is_generated}
                        onClick={handleGeneration}>Generate</Button>
                </div>
            </div>
        </div>
    )
}