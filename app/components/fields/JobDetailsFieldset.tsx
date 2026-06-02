export default function JobDetailsFieldset({ register }: { register: any }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Job Details</h3>
      <div className="grid gap-3">
        <select 
          {...register("jobType")} 
          className="border p-2 rounded"
        >
          <option value="">Select Job Type</option>
          <option>Pipe Leak</option>
          <option>Drain Cleaning</option>
          <option>Water Heater</option>
          <option>Emergency Repair</option>
          <option>Inspection</option>
        </select>

        <select 
          {...register("leadSource")} 
          className="border p-2 rounded"
        >
          <option value="">Select Lead Source</option>
          <option>Phone Call</option>
          <option>Website</option>
          <option>Google Ads</option>
          <option>Referral</option>
          <option>Support</option>
        </select>

        <textarea 
          {...register("description")} 
          placeholder="Description" 
          className="border p-2 rounded" 
        />
      </div>
    </div>
  );
}