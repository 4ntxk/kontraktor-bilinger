import { useGetContractorBillingQuery } from "../../app/api/apiSlice";

const AllBillingsTable = () => {
  const {
    data: contractorBillingData,
    error,
    isLoading,
  } = useGetContractorBillingQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Contractor Billing Data</h1>
      <ul>
        {contractorBillingData.data.map((item) => (
          <li key={item.id}>
            <div>ID: {item.id}</div>
            <div>Contractor ID: {item.contractorId}</div>
            <div>Worked Hours: {item.workedHours}</div>
            <div>Year: {item.year}</div>
            <div>Month: {item.month}</div>
            <div>Contractor Remuneration: {item.contractorRemuneration}</div>
            <div>Client Charge: {item.clientCharge}</div>
            <div>Profit: {item.profit}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllBillingsTable;
