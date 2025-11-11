"use client";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/forms/form-field";

export default function StepPatientInfo({
  formData,
  setFormData,
  onNext,
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
          name="dateOfReferral"
          label="Date of Referral"
          type="date"
          value={formData.dateOfReferral}
          onChange={(e: any) =>
            setFormData({ ...formData, dateOfReferral: e.target.value })
          }
        />
        <FormField
          name="timeOfReferral"
          label="Time of Referral"
          type="datetime"
          value={formData.timeOfReferral}
          onChange={(e: any) =>
            setFormData({ ...formData, timeOfReferral: e.target.value })
          }
        />
      </div>

      <FormField
        name="name"
        label="Patient Name"
        placeholder="John Doe"
        required
        value={formData.name}
        onChange={(e: any) =>
          setFormData({ ...formData, name: e.target.value })
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          name="rnNumber"
          label="RN Number"
          value={formData.rnNumber}
          onChange={(e: any) =>
            setFormData({ ...formData, rnNumber: e.target.value })
          }
        />
        <FormField
          name="icNumber"
          label="IC Number"
          value={formData.icNumber}
          onChange={(e: any) =>
            setFormData({ ...formData, icNumber: e.target.value })
          }
        />
        <FormField
          name="age"
          label="Age"
          type="text"
          value={formData.age}
          onChange={(e: any) =>
            setFormData({ ...formData, age: e.target.value })
          }
        />
      </div>

      <Button type="submit" className="w-full">
        Next
      </Button>
    </form>
  );
}
