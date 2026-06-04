import FieldWrapper from "./FieldWrapper";
import { getFieldClasses } from "@/utils/fieldClasses";

export default function ServiceLocationFieldset({ register, errors }: { register: any, errors: any }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Service Location</h3>
      <div className="grid gap-2">
        <div className="flex-1 flex gap-2">
          <FieldWrapper error={errors.address}>
            <input
              {...register("address")}
              placeholder="Address"
              className={getFieldClasses(!!errors.address)}
            />
          </FieldWrapper>

          <FieldWrapper error={errors.city}>
            <input
              {...register("city")}
              placeholder="City"
              className={getFieldClasses(!!errors.city)}
            />
          </FieldWrapper>
        </div>
        <div className="flex-1 flex gap-2">
          <FieldWrapper error={errors.zip}>
            <input
              {...register("zip")}
              placeholder="ZIP"
              className={getFieldClasses(!!errors.zip)}
            />
          </FieldWrapper>

          <FieldWrapper error={errors.area}>
            <input
              {...register("area")}
              placeholder="Area"
              className={getFieldClasses(!!errors.area)}
            />
          </FieldWrapper>
        </div>
      </div>
    </div>
  );
}