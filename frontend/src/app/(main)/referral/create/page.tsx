import ReferralCreateForm from "./ReferralCreateForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReferralCreate() {
  return (
    <div className="flex justify-center w-full px-6 py-10">
      <div className="w-full max-w-6xl ">
        <ReferralCreateForm />
      </div>
    </div>
  );
}
