import { Job } from "@/types/job";

interface Props {
  jobs: Job[];
  onStatusChange: (
    id: number,
    status: string
  ) => void;
  onClick: (open: boolean) => void;
}

export default function JobBoard({ jobs, onStatusChange, onClick }: Props) {
  const statuses = [
    { value: 'SCHEDULED', label: 'Scheduled', color: 'bg-blue-500' },
    { value: 'IN_PROGRESS', label: 'In Progress', color: 'bg-yellow-500' },
    { value: 'COMPLETED', label: 'Completed', color: 'bg-green-500' },
    { value: 'LOST', label: 'Lost', color: 'bg-red-500' },
  ];

  return (
    <div className="border-r h-screen p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">Jobs</h2>
        
        <button
          onClick={() => onClick(true)}
          className="px-3 py-1 bg-black text-white rounded"
        >   
          Create job
        </button>
      </div>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs yet</p>
      ) : (
        <div className="space-y-2 h-[90vh] overflow-y-auto">
          {jobs.map((job) => (
            <div key={job.id} className="border rounded p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold">{job.jobType}</div>
                  <div className="text-sm text-gray-500">Job ID: {job.id}</div>
                  <div className="text-sm">{job.address}</div>
                  <div className="text-sm">{job.startDate}</div>
                  <div className="text-sm">Technician: {job.technician}</div>
                </div>
                
                <div className="flex gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => onStatusChange(job.id, status.value)}
                      className={`px-3 py-1 rounded text-sm text-white transition-colors ${
                        job.status === status.value
                          ? status.color
                          : 'bg-gray-400 hover:bg-gray-500'
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}