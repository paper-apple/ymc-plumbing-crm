"use client";

import { Lead } from "@/types/lead";

interface Props {
  lead: Lead;
  open: boolean;
  onClose: () => void;
}

export default function CreateJobModal({
  lead,
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[800px] rounded-lg p-6">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">
            Create Job
          </h2>

          <button onClick={onClose}>
            Close
          </button>
        </div>

        <div className="mt-6">
          <p>
            Customer: {lead.firstName}{" "}
            {lead.lastName}
          </p>

          <p>{lead.phone}</p>
        </div>
      </div>
    </div>
  );
}