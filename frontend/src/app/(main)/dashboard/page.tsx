'use client';
import { useEffect, useState } from "react";
import ReferralDataTable from "../referral/_components/ReferralDataTable";
import api from "@/lib/api";
import { Referral } from "@/lib/model";
import { columns } from "../referral/_blocs/table";

export default function DashboardComponent() {
    const [referrals, setReferrals] = useState<Referral[]>([]);

    useEffect(() => {
        api.get("/referrals").then((e) => setReferrals(e.data.data));
    }, []);

    return (
        <div className="flex justify-center w-full px-6 py-10">
            <div className="w-full max-w-6xl ">
                <ReferralDataTable data={referrals} columns={columns} />
            </div>
        </div>
    );
}
