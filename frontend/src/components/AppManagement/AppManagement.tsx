import { Button, Card } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { useForm } from "react-hook-form"
import { useToast } from '../ui/use-toast';
import { useAppManagementContext } from './AppManagementProvider';
import { App } from "../../types/App";
import { AppsDataTable } from './AppsTable/AppsDataTable';
import { columns } from './AppsTable/Columns';

const AppSchema = z.object({
    name: z
        .string()
        .nonempty("Text is required")
        .min(5, "Text is too short, min 5 characters")
        .max(10, "Text is too long, max 10 characters"),
    description: z
        .string()
        .nonempty("Text is required")
        .min(10, "Text is too short, min 10 characters")
        .max(100, "Text is too long, max 100 characters")
})

type AppValues = z.infer<typeof AppSchema>;

const defaultValues: AppValues = {
    name: '',
    description: ''
}

export function AppManagement() {
    const { toast } = useToast();
    const { createApp, getApps } = useAppManagementContext();
    const [data, setData] = useState<App[]>([]);

    const form = useForm<AppValues>({
        resolver: zodResolver(AppSchema),
        defaultValues,
    })

    const onSubmit = async (data: AppValues) => {
        console.log(data);
        const application: App = {
            name: data.name,
            description: data.description,
            path: "N/A",
            is_generated: false,
            is_selected: false,
        }
        const result = await createApp(JSON.stringify(application));
        console.log(result);
        toast({
            title: "App created",
            description: `We have created the app for you.
            <pre>
            ${JSON.stringify(data, null, 2)}
            </pre>`,
        })

        getApps().then(apps => {
            setData(apps);
        });
    }

    useEffect(() => {
        getApps().then(apps => {
            setData(apps);
        });
    }, [getApps]);

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <h2 className="text-2xl font-bold tracking-tight">Create a new app or Select an existing one.</h2>
                    </div>
                </div>
                <div className="flex-1 space-y-4 p-8 pt-6">
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
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <input type="text" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    The text should be at least 5 characters long and at most 10 characters long.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Please include all information relevant to you." {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    The text should be at least 10 characters long and at most 100 characters long.
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

                    <div className="container mx-auto">
                        <AppsDataTable columns={columns} data={data} />
                    </div>
                </div>
            </div>
        </>
    )
}

