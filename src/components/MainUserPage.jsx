import AllContractorsTable from "./ui/AllContractorsTable";
import SingleContractorTable from "./ui/SingleContractorTable";
import ContractorForm from "./ui/ContractorForm";
import { columns } from "./ui/columns";
import { DataTable } from "./ui/DataTable";

const MainUserPage = () => {
  function getData() {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      // ...
    ];
  }

  const data = getData();
  return (
    <>
      <div className="flex text-4xl justify-center text-center">
        barykada tokenowa pokonana :PPPPP
      </div>
      <DataTable columns={columns} data={data} />
      {/* <AllContractorsTable /> */}
      {/* <SingleContractorTable /> */}
      {/* <ContractorForm /> */}
    </>
  );
};

export default MainUserPage;
