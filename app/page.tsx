"use client";

import { useEffect, useState } from "react";
import LeadList from "@/app/components/LeadList";
import { Lead } from "@/types/lead";
import CreateJobModal from "@/app/components/CreateJobModal";
import { Job } from "@/types/job";
import JobBoard from "@/app/components/JobBoard";
import EventLog from "@/app/components/EventLog";
import { EventLog as EventType } from "@/types/event";
import CreateLeadModal from "@/app/components/CreateLeadModal";

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] =useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const loadJobs = async () => {
    const response = await fetch("/api/jobs/list");

    const data = await response.json();

    setJobs(data);
  };

  const loadEvents = async () => {
    const response = await fetch("/api/events");

    const data = await response.json();

    setEvents(data);
  };

  const loadLeads = async () => {
    const response = await fetch("/api/leads");

    const data = await response.json();

    setLeads(data);

    if (
      data.length > 0 && !selectedLead
    ) {
      setSelectedLead(data[0]);
    }
  };

  const updateStatus = async (
    id: number,
    status: string
  ) => {
    await fetch(
      `/api/jobs/${id}/status`,
      {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({status}),
      }
    );

    await loadJobs();
    await loadEvents();
  };

  const refreshAll = async () => {
    await Promise.all([
      loadLeads(),
      loadJobs(),
      loadEvents(),
    ]);
  };

  useEffect(() => {
    loadLeads();
    loadJobs();
    loadEvents();
  }, []);

  return (
    <main className="grid grid-cols-[320px_1fr] h-screen">
      <LeadList
        leads={leads}
        selectedLead={selectedLead}
        onSelect={setSelectedLead}
        onCreateLead={() => setIsLeadModalOpen(true)}
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
      <div className="mt-12">
        <JobBoard 
          jobs={jobs} 
          onStatusChange={updateStatus}
        />
      </div>
      <div className="mt-12">
        <EventLog events={events} />
      </div>
      {selectedLead && (
        <CreateJobModal
          lead={selectedLead}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          loadJobs={loadJobs}
          loadEvents={loadEvents}
        />
      )};
      <CreateLeadModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onLeadCreated={refreshAll}
      />
    </main>
  );
}