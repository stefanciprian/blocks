import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "react-query";
import { useToast } from "../ui/use-toast";
import { useForm } from 'react-hook-form';
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../ui/form';
import { Button, Card } from '@radix-ui/themes';
import { Input } from "../ui/input";
import { useNotionContext } from './NotionProvider';
import { useState } from 'react';
import UploadForm from './UploadForm';
import { Separator } from "../ui/separator";

const NotionSchema = z.object({
    database_id: z.string().nonempty("Text is required")
})

type NotionValues = z.infer<typeof NotionSchema>;

const defaultValues: NotionValues = {
    database_id: ''
}

export function Notion() {
    // Access the client
    const queryClient = useQueryClient()
    const { toast } = useToast();
    const { getNotionDatabase, generateCSVFromNotionDatabase } = useNotionContext();
    const [notionDatabase, setNotionDatabase] = useState<any>(null);

    const generateCSVFromNotionDB = async () => {
        if (notionDatabase) {
            const databaseJsonString = JSON.stringify(notionDatabase);
            await generateCSVFromNotionDatabase(databaseJsonString);
            toast({
                title: 'CSV generated',
                description: 'The CSV has been generated'
            })
        } else {
            toast({
                title: 'No database set',
                description: 'Please set a database id first'
            })
        }
    }


    const form = useForm<NotionValues>({
        resolver: zodResolver(NotionSchema),
        defaultValues,
    })

    const onSubmit = async (data: NotionValues) => {
        console.log(data);
        const secretKey = "";
        const database = await getNotionDatabase(secretKey, data.database_id);
        console.log(database);
        setNotionDatabase(database);

        toast({
            title: 'Notion database id set',
            description: `The database id ${data.database_id} has been set`
        })
    }

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <h2 className="text-2xl font-bold tracking-tight">Notion Playground</h2>
                    </div>
                </div>
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <p>Before you set a database id, you need to set the Notion token in Settings</p>

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
                                        name="database_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Notion Database Id:</FormLabel>
                                                <FormControl>
                                                    <Input type="text" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Please enter the Database id of the Notion database you want to use.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                                <CardFooter className="justify-between space-x-2">
                                    <Button type="submit">Get Database Info</Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </Form>

                    {/* <p>Current Notion database id: {notionDatabase?.id || 'N/A'}</p>
                    <p>Current Notion database name: {notionDatabase?.title || 'N/A'}</p> */}

                    <Separator className="my-4" />
                    <div className="flex  space-x-4 text-sm">
                        <Card>
                            <CardHeader>
                                <CardTitle>Generate CSV</CardTitle>
                                <CardDescription>from you Notion Database and fill it with data.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p></p>
                                <Button onClick={generateCSVFromNotionDB}>Generate CSV</Button>
                            </CardContent>
                            <CardFooter>
                            </CardFooter>
                        </Card>
                        <Separator orientation="vertical" />
                        <Card>
                            <CardHeader>
                                <CardTitle>Upload filled CSV</CardTitle>
                                <CardDescription>import yor data from the CSV to Notion database.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <UploadForm />
                            </CardContent>
                            <CardFooter>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}