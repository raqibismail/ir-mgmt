import ReferralCreateForm from "./ReferralCreateForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReferralCreate() {
  return (
    <div>
      <Card className="bg-slate-50 backdrop-blur-lg border border-white/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-primary">Referral Form</CardTitle>
        </CardHeader>
        <CardContent>
          <ReferralCreateForm />
        </CardContent>
      </Card>
      ;
    </div>
  );
}
