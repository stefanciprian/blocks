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

    const features = [
        {
          name: 'Push to deploy.',
          description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
          icon: null,
        },
        {
          name: 'SSL certificates.',
          description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
          icon: null,
        },
        {
          name: 'Database backups.',
          description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
          icon: null,
        },
      ]

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                    </div>
                </div>
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Create a new app or Select an existing one.</h2>
                        <div className="flex items-center space-x-2">
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

                    <div className="container mx-auto py-10">
                        <AppsDataTable columns={columns} data={data} />
                    </div>
                </div>

                <div className="overflow-hidden bg-white py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                            <div className="lg:pr-8 lg:pt-4">
                                <div className="lg:max-w-lg">
                                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
                                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better workflow</p>
                                    <p className="mt-6 text-lg leading-8 text-gray-600">
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                                        iste dolor cupiditate blanditiis ratione.
                                    </p>
                                    <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                        {features.map((feature) => (
                                            <div key={feature.name} className="relative pl-9">
                                                <dt className="inline font-semibold text-gray-900">
                                                    {/* <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" /> */}
                                                    {feature.name}
                                                </dt>{' '}
                                                <dd className="inline">{feature.description}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            </div>
                            <img
                                src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                                alt="Product screenshot"
                                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                                width={2432}
                                height={1442}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

