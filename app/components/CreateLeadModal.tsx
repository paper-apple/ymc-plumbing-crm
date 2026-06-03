"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLeadSchema, CreateLeadFormData} from "@/schemas/createLeadSchema";

interface Props {
  open: boolean;
  onClose: () => void;
  onLeadCreated: () => Promise<void>;
}

export default function CreateLeadModal({
  open,
  onClose,
  onLeadCreated,
}: Props) {
  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      isSubmitting,
    },
  } = useForm<CreateLeadFormData>({resolver: zodResolver(createLeadSchema)});

  if (!open) return null;

  const onSubmit = async (data: CreateLeadFormData) => {
    try {
      setError("");

      const response = await fetch(
        "/api/leads/create",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      setSuccess(true);

      await onLeadCreated();

      reset();

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch {
      setError(
        "Failed to create lead"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[500px] rounded-lg p-6">

        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">
            Create Lead
          </h2>

          <button
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="mt-6 space-y-3"
        >
          <input
            {...register(
              "firstName"
            )}
            placeholder="First Name"
            className="border p-2 rounded w-full"
          />

          <input
            {...register(
              "lastName"
            )}
            placeholder="Last Name"
            className="border p-2 rounded w-full"
          />

          <input
            {...register(
              "phone"
            )}
            placeholder="Phone"
            className="border p-2 rounded w-full"
          />

          <input
            {...register(
              "email"
            )}
            placeholder="Email"
            className="border p-2 rounded w-full"
          />

          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-600">
              Lead created successfully
            </p>
          )}

          <button
            disabled={
              isSubmitting
            }
            className="bg-black text-white px-4 py-2 rounded"
          >
            {isSubmitting
              ? "Creating..."
              : "Create Lead"}
          </button>
        </form>
      </div>
    </div>
  );
}