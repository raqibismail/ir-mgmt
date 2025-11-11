"use client";
import { useEffect, useState } from "react";
import ReferralDataTable from "../referral/_components/ReferralDataTable";
import api from "@/lib/api";
import { Referral } from "@/lib/model";
import { columns } from "../referral/_blocs/table";
import { Button } from "@/components/ui/button";
import { Cross } from "lucide-react";
import AppButton from "@/components/app-button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function DashboardComponent() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const router = useRouter();

  useEffect(() => {
    api.get("/referrals").then((e) => setReferrals(e.data.data));
  }, []);

  return (
    <div className="flex justify-center w-full px-6 py-10">
      <div className="w-full max-w-6xl ">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-100">
            Referral Data
          </h2>
          <AppButton onClick={(e) => router.push('/referral/create')}>
            <Cross />
          </AppButton>
        </div>
        <Separator className="my-2" />
        <ReferralDataTable data={referrals} columns={columns} />
      </div>
    </div>
  );
}
