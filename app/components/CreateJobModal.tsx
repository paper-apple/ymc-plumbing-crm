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
  loadJobs: () => void;
  loadEvents: () => void;
}

export default function CreateJobModal({
  lead,
  open,
  onClose,
  loadJobs,
  loadEvents,
}: Props) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
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

      await loadJobs();
      await loadEvents();
      
      setSuccess(true);

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch {
      setError("Failed to create job");
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[800px] rounded-lg p-6 h-screen flex flex-col">
        <div className="flex justify-between items-center pb-4 border-b border-gray-300">
          <h2 className="text-xl font-bold">
            Create Job
          </h2>

          <button 
            onClick={handleClose}
            className="bg-black text-white text-xl px-2 py-0.5 rounded"
          >
            ✕
          </button>
        </div>

        <div className="mt-3">
          <p>
            Customer: {lead.firstName}{" "}
            {lead.lastName}{" | "}{lead.phone}
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-3 space-y-2 flex-1 pr-2"
        >
          <JobDetailsFieldset register={register} errors={errors} />
          <ServiceLocationFieldset register={register} errors={errors} />
          <SchedulingFieldset register={register} errors={errors} />

          <div className="flex-1 flex gap-2">
            <button
              disabled={isSubmitting}
              className="bg-black text-white px-4 py-2 rounded disabled:opacity-50 w-35"
            >
              {isSubmitting
                ? "Creating..."
                : "Create Job"}
            </button>
            {error && (
              <p className="text-red-500 py-2">
                {error}
              </p>
            )}

            {success && (
              <p className="text-green-600 py-2">
                Job created successfully
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}