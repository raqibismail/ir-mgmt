"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import StepPatientInfo from "./_forms/StepPatientInfo";
import StepMedicalDetails from "./_forms/StepMedicalDetails";
import StepReferralDetails from "./_forms/StepReferralDetails";

export default function ReferralCreateForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<any>({
    dateOfReferral: new Date(),
    timeOfReferral: "",
    name: "",
    rnNumber: "",
    icNumber: "",
    age: "",
    department: "",
    location: "",
    diagnosis: "",
    sofaScore: "",
    reasonForReferral: "",
    medicalOfficerName: "",
    siteCoordinator: "",
    test: "",
  });

  const handleSubmitAll = async () => {
    setIsSubmitting(true);
    console.log("Combined Data:", formData);

    // example API POST
    // await fetch("/api/referrals", { method: "POST", body: JSON.stringify(formData) });

    setIsSubmitting(false);
  };



  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="w-full py-6 space-y-4">
      <h2 className="text-lg font-semibold text-slate-100">Referral Form</h2>
      <Separator />

      {step === 1 && (
        <StepPatientInfo
          formData={formData}
          setFormData={setFormData}
          onNext={nextStep}
        />
      )}

      {step === 2 && (
        <StepMedicalDetails
          formData={formData}
          setFormData={setFormData}
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}

      {step === 3 && (
        <StepReferralDetails
          formData={formData}
          setFormData={setFormData}
          onPrev={prevStep}
          onSubmit={handleSubmitAll}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
