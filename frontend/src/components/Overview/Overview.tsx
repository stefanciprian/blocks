import { useToast } from '../ui/use-toast';
import { useOverviewContext } from './OverviewProvider';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { Application } from '../../types/Application';


export function Overview() {
    const [path, setPath] = useState('');
    const { selectFolder, generateApplication, getSelectedApplication } = useOverviewContext();
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
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
        if (selectedApplication !== null) {
            const application: Application = {
                ...selectedApplication,
                path,
            }
            setSelectedApplication(application);
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
        if (selectedApplication === null) {
            toast({
                title: "No application selected",
                description: `Please select an application first.`,
            })
            return;
        }
        if (selectedApplication.path === "N/A" || selectedApplication.path === "") {
            toast({
                title: "No path selected",
                description: `Please select a path first.`,
            })
            return;
        }
        if (selectedApplication.is_generated) {
            toast({
                title: "Application already generated",
                description: `The application is already generated.`,
            })
            return;
        }
        await generateApplication(selectedApplication);
        toast({
            title: "Generating application",
            description: `We are generating the application for you.`,
        })
    }

    useEffect(() => {
        console.log('Path:', path);
        console.log('Select folder:', selectFolder);

        getSelectedApplication().then((application) => {
            console.log('Selected application:', application);
            setSelectedApplication(application);
        })
    }, [])

    return (
        <div className="hidden flex-col md:flex">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <h2 className="text-2xl font-bold tracking-tight">Generate application, add modules & configure them.</h2>
                </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <h2 className="font-bold tracking-tight">Selected application:</h2>
                {selectedApplication === null ? <p>No application selected</p> : <p>{selectedApplication?.id} {selectedApplication?.name}</p>}

                <h2 className="font-bold tracking-tight">Select path where the application should be located:</h2>

                <div className="flex items-center space-x-2">
                    <Input type="email" placeholder="Path" value={path} />
                    <Button disabled={selectedApplication === null} onClick={handleFolderSelection}>Select</Button>
                </div>

                <h2 className="font-bold tracking-tight">Generate application:</h2>
                <div className="flex items-center space-x-2">
                    <Button disabled={
                        (selectedApplication !== null) &&
                        (selectedApplication.path !== ("N/A" || ""))
                        && selectedApplication.is_generated}
                        onClick={handleGeneration}>Generate</Button>
                </div>
            </div>
        </div>
    )
}