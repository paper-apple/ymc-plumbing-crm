import type { EventLog } from "@/types/event";

interface Props {
  events: EventLog[];
}

export default function EventLog({
  events,
}: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Event Log
      </h2>

      <div className="space-y-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="border rounded p-3"
          >
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
    </div>
  );
}