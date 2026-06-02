export default function ServiceLocationFieldset({ register }: { register: any }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Service Location</h3>
      <div className="grid gap-3">
        <input 
          {...register("address")} 
          placeholder="Address" 
          className="border p-2 rounded" 
        />
        <input 
          {...register("city")} 
          placeholder="City" 
          className="border p-2 rounded" 
        />
        <input 
          {...register("zip")} 
          placeholder="ZIP" 
          className="border p-2 rounded" 
        />
        <input 
          {...register("area")} 
          placeholder="Area" 
          className="border p-2 rounded" 
        />
      </div>
    </div>
  );
}