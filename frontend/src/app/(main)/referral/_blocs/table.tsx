"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import api from "@/lib/api";
import { Referral } from "@/lib/model";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Pencil, Trash } from "lucide-react";

export const columns: ColumnDef<Referral>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="table-checkbox"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="table-checkbox"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: "rnNumber",
    header: "RN Number",
  },
  {
    accessorKey: "icNumber",
    header: "IC Number",
  },
  {
    accessorKey: "dateOfReferral",
    header: "Date of Referral",
  },
  {
    accessorKey: "timeOfReferral",
    header: "Time of Referral",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-3 text-center ">
        <Eye
          size={20}
          className="text-primary hover:text-slate-200 hover:cursor-pointer"
          onClick={() => console.log("View", row.original)}
        >
          View
        </Eye>
        <Pencil
          size={20}
          className="text-primary hover:text-slate-200 hover:cursor-pointer"
          onClick={() => console.log("Edit", row.original)}
        >
          Edit
        </Pencil>
        <Trash
          size={20}
          className="text-primary hover:text-slate-200 hover:cursor-pointer"
          onClick={() => deleteRow(row.original.id)}
        >
          Delete
        </Trash>
      </div>
    ),
    enableSorting: false, // usually action columns are not sortable
    enableHiding: false, // optional
  },
];

const deleteRow = async (id: string) => {
  await api.delete(`/referrals/${id}`);
};
