export default function SchedulingFieldset({ register }: { register: any }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">
        Scheduling
      </h3>

      <div className="grid gap-3">
        <input
          type="date"
          {...register("startDate")}
          className="border p-2 rounded"
        />

        <input
          type="time"
          {...register("startTime")}
          className="border p-2 rounded"
        />

        <input
          type="time"
          {...register("endTime")}
          className="border p-2 rounded"
        />

        <input
          {...register("technician")}
          placeholder="Technician"
          className="border p-2 rounded"
        />
      </div>
    </div>
  );
}