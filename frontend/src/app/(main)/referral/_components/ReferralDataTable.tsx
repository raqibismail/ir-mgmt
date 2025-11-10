import { DataTable } from "@/components/datatables/Datatable";
import { Referral } from "@/lib/model";
import { ColumnDef } from "@tanstack/react-table";

interface ReferralDataTableProps {
    columns: ColumnDef<Referral>[],
    data: Referral[];
}

export default function ReferralDataTable({ columns, data }: ReferralDataTableProps) {
    if (!data || data.length === 0) {
        return <div className="p-6 text-sm text-muted-foreground">Loading data…</div>
    }

    return <DataTable columns={columns} data={data} />
}