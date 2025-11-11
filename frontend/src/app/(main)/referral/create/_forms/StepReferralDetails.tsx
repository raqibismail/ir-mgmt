"use client";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/forms/form-field";

const testSelect = [
  { id: 1, value: "A" },
  { id: 2, value: "B" },
  { id: 3, value: "C" },
  { id: 4, value: "D" },
];

export default function StepReferralDetails({
  formData,
  setFormData,
  onPrev,
  onSubmit,
  isSubmitting,
}: any) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6"
    >
      <FormField
        name="reasonForReferral"
        label="Reason for Referral"
        placeholder="Describe briefly..."
        type="textarea"
        value={formData.reasonForReferral}
        onChange={(e: any) =>
          setFormData({ ...formData, reasonForReferral: e.target.value })
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          name="medicalOfficerName"
          label="Medical Officer Name"
          value={formData.medicalOfficerName}
          onChange={(e: any) =>
            setFormData({ ...formData, medicalOfficerName: e.target.value })
          }
        />
        <FormField
          name="siteCoordinator"
          label="Site Coordinator"
          value={formData.siteCoordinator}
          onChange={(e: any) =>
            setFormData({ ...formData, siteCoordinator: e.target.value })
          }
        />
      </div>

      <FormField
        name="test"
        label="Test"
        type="select"
        options={testSelect}
        placeholder="Test"
        value={formData.test}
        onChange={(e: any) =>
          setFormData({ ...formData, test: e.target.value })
        }
      />

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-linear-to-r from-indigo-500 to-purple-600"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
