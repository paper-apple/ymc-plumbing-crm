export interface Job {
  id: number;

  status: string;

  jobType: string;

  technician: string;

  address: string;

  startDate: string;

  lead: {
    firstName: string;
    lastName: string;
    phone: string;
  };
}