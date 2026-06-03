import { Job } from "@/types/job";

interface Props {
  jobs: Job[];
  onStatusChange: (
    id: number,
    status: string
  ) => void;
}

export default function JobBoard({
  jobs,
  onStatusChange,
}: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Jobs
      </h2>

      <div className="space-y-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border rounded p-4"
          >
            <div className="font-semibold">
              {job.lead.firstName}{" "}
              {job.lead.lastName}
            </div>

            <div>
              Job ID: {job.id}
            </div>
            
            <div>
              {job.jobType}
            </div>

            <div>
              Status: {job.status}
            </div>
            <button
              onClick={() =>
                onStatusChange(
                  job.id,
                  "SCHEDULED"
                )
              }
            >
              Scheduled
            </button>

            <button
              onClick={() =>
                onStatusChange(
                  job.id,
                  "IN_PROGRESS"
                )
              }
            >
              In Progress
            </button>

            <button
              onClick={() =>
                onStatusChange(
                  job.id,
                  "COMPLETED"
                )
              }
            >
              Completed
            </button>

            <button
              onClick={() =>
                onStatusChange(
                  job.id,
                  "LOST"
                )
              }
            >
              Lost
            </button>
            <div>
              Technician: {job.technician}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}