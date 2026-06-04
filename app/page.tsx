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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const loadJobs = async () => {
    const response = await fetch("/api/jobs/list");

    const data = await response.json();

    const selectedJobs = data.filter(
      (job: Job) => job.leadId === selectedLead?.id
    );

    setJobs(selectedJobs);
  };

  const loadEvents = async () => {
    const response = await fetch("/api/events");

    const data = await response.json();

    const jobIds = jobs.map(job => job.id);
    const selectedEvents = data.filter(
      (event: EventType) => jobIds.includes(event.jobId)
    );

    setEvents(selectedEvents);
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

  useEffect(() => {
    loadLeads();
    loadJobs();
    loadEvents();
  }, [selectedLead]);

  useEffect(() => {
    if (!selectedLead) return;

    const loadJobsForLead = async () => {
      await loadJobs();
    };

    loadJobsForLead();
  }, [selectedLead]);

  useEffect(() => {
    const loadEventsForJobs = async () => {
      await loadEvents();
    };

    loadEventsForJobs();
  }, [jobs]);

  return (
    <main className="grid grid-cols-[300px_300px_610px_1fr] h-screen overflow-y-hidden">
      <LeadList
        leads={leads}
        selectedLead={selectedLead}
        onSelect={setSelectedLead}
        onCreateLead={() => setIsLeadModalOpen(true)}
      />

      <div className="p-4 border-r">
        <h1 className="font-bold text-xl">
          Lead Details
        </h1>
        {selectedLead ? (
          <>
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
          </>
        ) : (
          <p className="text-gray-500 pt-5">No leads yet</p>
        )}
      </div>
      <div>
        <JobBoard 
          jobs={jobs} 
          onStatusChange={updateStatus}
          onClick={() => setIsCreateModalOpen(true)}
        />
      </div>
      <div>
        <EventLog events={events} />
      </div>
      {selectedLead && (
        <CreateJobModal
          lead={selectedLead}
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          loadJobs={loadJobs}
          loadEvents={loadEvents}
        />
      )}
      <CreateLeadModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onLeadCreated={refreshAll}
      />
    </main>
  )
}