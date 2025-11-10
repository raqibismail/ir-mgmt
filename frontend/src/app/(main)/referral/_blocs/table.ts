"use client";
import { Referral } from "@/lib/model";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Referral>[] = [
  {
    accessorKey: "rnNumber",
    header: "RN Number",
  },
  {
    accessorKey: "icNumber",
    header: "IC Number",
  },
  {
    accessorKey: "dateOfReferral",
    header: "Date of Referral",
  },
  {
    accessorKey: "timeOfReferral",
    header: "Time of Referral",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];

// id;
// dateOfReferral;
// timeOfReferral;
// name;
// rnNumber;
// icNumber;
// age;
// sex;
// department;
// location;
// diagnosis;
// sofaScore;
// categoryVentilated;
// reasonForReferral;
// intubatedAfterNivHfnc;
// intubationDate;
// admittedToICU;
// admissionPlanned;
// anesthesiaRelated;
// notAdmittedReason;
// hospitalOutcome;
// medicalOfficerName;
// siteCoordinator;
// createdBy;
// createdAt;
// updatedAt;
