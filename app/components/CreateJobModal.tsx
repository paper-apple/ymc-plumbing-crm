"use client";

import { Lead } from "@/types/lead";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createJobSchema,
  CreateJobFormData,
} from "@/schemas/createJobSchema";
import JobDetailsFieldset from "./fields/JobDetailsFieldset";
import SchedulingFieldset from "./fields/SchedulingFieldset";
import ServiceLocationFieldset from "./fields/ServiceLocationFieldset";

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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),
  });

  const onSubmit = async (
    data: CreateJobFormData
  ) => {
    try {
      setError("");

      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadId: lead.id,
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      setSuccess(true);

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch {
      setError("Failed to create job");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-gray-500 w-[800px] rounded-lg p-6 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center pb-4 border-b border-gray-300">
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-6 flex-1 overflow-y-auto pr-2"
          style={{ maxHeight: "60vh" }}
        >
          <JobDetailsFieldset register={register} />
          <ServiceLocationFieldset register={register} />
          <SchedulingFieldset register={register} />
          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-600">
              Job created successfully
            </p>
          )}

          <button
            disabled={isSubmitting}
            className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isSubmitting
              ? "Creating..."
              : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
}