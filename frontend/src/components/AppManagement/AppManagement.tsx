import { Box, Button, Card, Flex, Text } from '@radix-ui/themes';
import { Greet } from '../../../wailsjs/go/main/App';
import { useState } from 'react';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { useForm } from "react-hook-form"
import { useToast } from '../ui/use-toast';
import { useAppManagementContext } from './AppManagementProvider';

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
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);

    function greet() {
        Greet(name).then(updateResultText);
    }

    const form = useForm<AppValues>({
        resolver: zodResolver(AppSchema),
        defaultValues,
    })

    const onSubmit = (data: AppValues) => {
        console.log(data);
    }

    return (
        <Flex gap="3">
            <Text size="2">Create a new app or Select an existing one.</Text>
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
            <div id="input" className="input-box">
                <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text" />
                <button className="btn" onClick={greet}>Greet</button>
            </div>
        </Flex>
    )
}

