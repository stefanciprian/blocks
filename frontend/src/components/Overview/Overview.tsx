import { useToast } from '../ui/use-toast';
import { useOverviewContext } from './OverviewProvider';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';


export function Overview() {
    const { toast } = useToast();
    const { selectFolder } = useOverviewContext();
    const [path, setPath] = useState('');

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
                Select path where the app should be located

                <div className="flex items-center space-x-2">
                    <Input type="email" placeholder="Path" value={path} />
                    <Button onClick={handleFolderSelection}>Select</Button>
                </div>
            </div>
        </div>
    )
}