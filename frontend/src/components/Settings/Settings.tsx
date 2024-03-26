import { Separator } from "../ui/separator";
import { useEffect, useState } from 'react';
import { useSettingsContext } from './SettingsProvider';

//const SettingsSchema = z.object({

export function Settings() {
    const [nodeJSStatus, setNodeJSStatus] = useState('checking');
    const { checkNodeJS } = useSettingsContext();

    useEffect(() => {
        async function checkNodeJSStatus() {
            const response = await checkNodeJS();
            setNodeJSStatus(response);
        }
        checkNodeJSStatus();
    }, [checkNodeJS]);

    return (
        <div className="hidden flex-col md:flex">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <h2 className="text-2xl font-bold tracking-tight">Set general settings for the selected app.</h2>
                </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div>
                    <div className="space-y-1">
                        <h4 className="text-sm font-medium leading-none">Prerequisites</h4>
                        <p className="text-sm text-muted-foreground">
                            You need to have a Node.js environment installed on your machine.
                        </p>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex h-5 items-center space-x-4 text-sm">
                        <div>NodeJS Status</div>
                        <Separator orientation="vertical" />
                        <div>{nodeJSStatus}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}