import { Lead } from "@/types/lead";

interface Props {
  leads: Lead[];
  selectedLead: Lead | null;
  onSelect: (lead: Lead) => void;
  onCreateLead: () => void;
}

export default function LeadList({
  leads,
  selectedLead,
  onSelect,
  onCreateLead,
}: Props) {
  return (
    <div className="border-r h-screen p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">
          Leads
        </h2>

        <button
          onClick={onCreateLead}
          className="px-3 py-1 bg-black text-white rounded"
        >
          Create lead
        </button>
      </div>
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
            
          </button>
        ))}
      </div>
    </div>
  );
}