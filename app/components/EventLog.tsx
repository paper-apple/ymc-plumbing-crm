import type { EventLog } from "@/types/event";

interface Props {
  events: EventLog[];
}

export default function EventLog({
  events,
}: Props) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Event Log
      </h2>

     {events.length === 0 ? (
        <p className="text-gray-500">No events yet</p>
      ) : (
        <div className="space-y-2 h-[90vh] overflow-y-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className="border rounded p-3"
            >
              <div className="font-medium">
                Job ID: {event.jobId}
              </div>

              <div className="font-medium">
                {event.type}
              </div>

              <div>
                {event.message}
              </div>

              <div className="text-xs text-gray-500">
                {new Date(
                  event.createdAt
                ).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}