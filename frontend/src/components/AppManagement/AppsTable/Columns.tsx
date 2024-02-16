import { App } from "@/src/types/App"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<App>[] = [
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
    }
]
