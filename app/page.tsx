"use client";

import { useEffect, useState } from "react";

import LeadList from "@/app/components/LeadList";
import { Lead } from "@/types/lead";
import CreateJobModal from "@/app/components/CreateJobModal";

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] =useState(false);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);

        if (data.length > 0) {
          setSelectedLead(data[0]);
        }
      });
  }, []);

  return (
    <main className="grid grid-cols-[320px_1fr] h-screen">
      <LeadList
        leads={leads}
        selectedLead={selectedLead}
        onSelect={setSelectedLead}
      />

      <div className="p-8">
        {selectedLead ? (
          <>
            <h1 className="text-3xl font-bold">
              Lead Details
            </h1>

            <div className="mt-6 space-y-2">
              <p>
                <strong>Name:</strong>{" "}
                {selectedLead.firstName}{" "}
                {selectedLead.lastName}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {selectedLead.phone}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {selectedLead.email || "-"}
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-8 px-4 py-2 rounded bg-black text-white"
            >   
              Create Job
            </button>
          </>
        ) : (
          <p>Select a lead</p>
        )}
      </div>
      {selectedLead && (
        <CreateJobModal
          lead={selectedLead}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )};
    </main>
  );
}