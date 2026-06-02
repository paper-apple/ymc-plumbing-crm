import { Lead } from "@/types/lead";

interface Props {
  leads: Lead[];
  selectedLead: Lead | null;
  onSelect: (lead: Lead) => void;
}

export default function LeadList({
  leads,
  selectedLead,
  onSelect,
}: Props) {
  return (
    <div className="border-r h-screen p-4">
      <h2 className="font-bold text-xl mb-4">
        Leads
      </h2>

      <div className="space-y-2">
        {leads.map((lead) => (
          <button
            key={lead.id}
            onClick={() => onSelect(lead)}
            className={`w-full text-left p-3 rounded border ${
              selectedLead?.id === lead.id
                ? "bg-gray-100"
                : ""
            }`}
          >
            <div>
              {lead.firstName} {lead.lastName}
            </div>

            <div className="text-sm text-gray-500">
              {lead.phone}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}