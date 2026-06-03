import FieldWrapper from "./FieldWrapper";
import { getFieldClasses } from "@/lib/fieldClasses";

export default function JobDetailsFieldset({ register, errors }: { register: any, errors: any }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Job Details</h3>
      <div className="grid gap-2">
        <div className="flex-1 flex gap-2">
          <FieldWrapper error={errors.jobType}>
            <select
              {...register("jobType")}
              className={getFieldClasses(errors.jobType)}
            >
              <option value="">Select Job Type</option>
              <option>Pipe Leak</option>
              <option>Drain Cleaning</option>
              <option>Water Heater</option>
              <option>Emergency Repair</option>
              <option>Inspection</option>
            </select>
          </FieldWrapper>

          <FieldWrapper error={errors.leadSource}>
            <select
              {...register("leadSource")}
              className={getFieldClasses(!!errors.leadSource)}
            >
              <option value="">Select Lead Source</option>
              <option>Phone Call</option>
              <option>Website</option>
              <option>Google Ads</option>
              <option>Referral</option>
              <option>Support</option>
            </select>
          </FieldWrapper>
        </div>
        <div>
          <FieldWrapper error={errors.description}>
            <input
              {...register("description")}
              placeholder="Description"
              className={getFieldClasses(!!errors.description)}
            />
          </FieldWrapper>
        </div>
      </div>
    </div>
  );
}