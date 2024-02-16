import { useToast } from '../ui/use-toast';
import { useOverviewContext } from './OverviewProvider';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { App } from '../../types/App';


export function Overview() {
    const [path, setPath] = useState('');
    const { selectFolder, getSelectedApp } = useOverviewContext();
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
        toast({
            title: "Folder selected",
            description: `We have selected the folder for you.
            <pre>
            ${path}
            </pre>`,
        })
    }

    useEffect(() => {
        console.log('Path:', path);
        console.log('Select folder:', selectFolder);

        getSelectedApp().then((app) => {
            console.log('Selected app:', app);
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
                <p></p>


                <h2 className="text-3xl font-bold tracking-tight">Select path where the app should be located:</h2>

                <div className="flex items-center space-x-2">
                    <Input type="email" placeholder="Path" value={path} />
                    <Button onClick={handleFolderSelection}>Select</Button>
                </div>
            </div>
        </div>
    )
}