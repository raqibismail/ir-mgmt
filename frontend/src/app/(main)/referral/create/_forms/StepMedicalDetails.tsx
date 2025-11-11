"use client";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/forms/form-field";

export default function StepMedicalDetails({
  formData,
  setFormData,
  onNext,
  onPrev,
}: any) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          name="department"
          label="Department"
          value={formData.department}
          onChange={(e: any) =>
            setFormData({ ...formData, department: e.target.value })
          }
        />
        <FormField
          name="location"
          label="Location"
          value={formData.location}
          onChange={(e: any) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          name="diagnosis"
          label="Diagnosis"
          value={formData.diagnosis}
          onChange={(e: any) =>
            setFormData({ ...formData, diagnosis: e.target.value })
          }
        />
        <FormField
          name="sofaScore"
          label="SOFA Score"
          type="text"
          value={formData.sofaScore}
          onChange={(e: any) =>
            setFormData({ ...formData, sofaScore: e.target.value })
          }
        />
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
