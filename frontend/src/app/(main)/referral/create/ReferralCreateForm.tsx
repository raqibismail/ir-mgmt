"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { FormField } from "@/components/forms/form-field";
import { Separator } from "@/components/ui/separator";

export default function ReferralCreateForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const testSelect = [
    { id: 1, value: "A" },
    { id: 2, value: "B" },
    { id: 3, value: "C" },
    { id: 4, value: "D" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    console.log(payload);

    // ... API POST logic here

    setIsSubmitting(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-4 py-4">
        <h2 className="text-lg font-semibold text-slate-100">Referral Form</h2>
        <Separator />
        <form onSubmit={handleSubmit} className="space-y-8 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              name="dateOfReferral"
              label="Date of Referral"
              type="date"
            />
            <FormField
              name="timeOfReferral"
              label="Time of Referral"
              type="datetime"
            />
          </div>

          <FormField
            name="name"
            label="Patient Name"
            placeholder="John Doe"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField name="rnNumber" label="RN Number" />
            <FormField name="icNumber" label="IC Number" />
            <FormField name="age" label="Age" type="number" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField name="department" label="Department" />
            <FormField name="location" label="Location" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField name="diagnosis" label="Diagnosis" />
            <FormField name="sofaScore" label="SOFA Score" type="number" />
          </div>

          <FormField
            name="reasonForReferral"
            label="Reason for Referral"
            placeholder="Describe briefly..."
            type="textarea"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField name="medicalOfficerName" label="Medical Officer Name" />
            <FormField name="siteCoordinator" label="Site Coordinator" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              name="test"
              label="Test"
              type="select"
              options={testSelect}
              placeholder="Test"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-medium py-2 rounded-lg shadow-md shadow-indigo-800/30 transition-all"
          >
            {isSubmitting ? "Submitting..." : "Submit Referral"}
          </Button>
        </form>
      </div>
    </div>
  );
}
