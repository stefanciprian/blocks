import { Separator } from "../ui/separator";
import { useEffect, useState } from 'react';
import { useSettingsContext } from './SettingsProvider';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../ui/form';
import { useForm } from "react-hook-form";
import { Button, Card } from '@radix-ui/themes';
import { Setting } from "@/src/types/Setting";
import { useToast } from "../ui/use-toast";

const SettingsSchema = z.object({
    notion_api_key: z.string().nonempty("Text is required"),
})

type SettingsValues = z.infer<typeof SettingsSchema>;

const defaultValues: SettingsValues = {
    notion_api_key: '',
}

export function Settings() {
    // Access the client
    const queryClient = useQueryClient();

    const { toast } = useToast();
    const { checkNodeJS, updateSetting } = useSettingsContext();

    const { data: nodeJSVersionResponse, isLoading, error } = useQuery('apps', checkNodeJS)

    const form = useForm<SettingsValues>({
        resolver: zodResolver(SettingsSchema),
        defaultValues,
    })

    const onSubmit = async (data: SettingsValues) => {
        console.log(data);
        const setting: Setting = {
            name: "notion_api_key",
            value: data.notion_api_key,
        }
        const result = mutation.mutate(setting)
        console.log(result);

        toast({
            title: "Updated settings",
            description: `Settings updated successfully.
            <pre>
            ${JSON.stringify(data, null, 2)}
            </pre>`,
        })
    }

    // Mutations
    const mutation = useMutation((setting: Setting) => updateSetting(JSON.stringify(setting)), {
        onSuccess: () => {
            queryClient.invalidateQueries('settings')
        }
    })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Something went wrong...</div>;

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
                        <div>{nodeJSVersionResponse}</div>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Create a new App</CardTitle>
                                <CardDescription>
                                    Create a new app by filling in the details below.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="notion_api_key"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Notion API Key:</FormLabel>
                                            <FormControl>
                                                <input type="text" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Notion API Key is required to access the Notion API.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter className="justify-between space-x-2">
                                <Button type="submit">Submit</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </div>
        </div>
    )
}