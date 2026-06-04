import FieldWrapper from "./FieldWrapper";
import { getFieldClasses } from "@/utils/fieldClasses";

export default function SchedulingFieldset({ register, errors }: { register: any, errors: any }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Scheduling</h3>
      <div className="grid gap-2">
        <div className="flex-1 flex gap-2">
          <FieldWrapper error={errors.startDate}>
            <input
              type="date"
              {...register("startDate")}
              className={getFieldClasses(!!errors.startDate)}
            />
          </FieldWrapper>

          <FieldWrapper error={errors.startTime}>
            <input
              type="time"
              {...register("startTime")}
              className={getFieldClasses(!!errors.startTime)}
            />
          </FieldWrapper>
        </div>

        <div className="flex-1 flex gap-2">
          <FieldWrapper error={errors.technician}>
            <input
              {...register("technician")}
              placeholder="Technician"
              className={getFieldClasses(!!errors.technician)}
            />
          </FieldWrapper>

          <FieldWrapper error={errors.endTime}>
            <input
              type="time"
              {...register("endTime")}
              className={getFieldClasses(!!errors.endTime)}
            />
          </FieldWrapper>
        </div>
      </div>
    </div>
  );
}