import { Application } from "@/src/types/Application"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../../ui/button"
import { SelectApplication } from '../../../../wailsjs/go/main/App';
import { useToast } from "../../ui/use-toast";
import { useAppManagementContext } from '../AppManagementProvider';


export const columns: ColumnDef<Application>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "path",
        header: "Path",
    },
    {
        accessorKey: "is_generated",
        header: "Is Generated",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
    },
    {
        accessorKey: "updated_at",
        header: "Updated At",
    },
    {
        accessorKey: "is_selected",
        header: "Is Selected",
        cell: ({ row }) => {
            const { toast } = useToast()
            const is_selected = row.original.is_selected;

            const handleSelect = async () => {
                const updateAppAsSelected = await SelectApplication(row.original.id || 0);
                console.log('Update app as selected:', updateAppAsSelected);
                toast({
                    title: "Selected App",
                    description: "You have selected app: " + row.original.name,
                })
            };

            return (
                <Button disabled={is_selected} variant="default" onClick={handleSelect}>Select</Button>
            )
        },
    }
]
