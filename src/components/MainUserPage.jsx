import AllBillingsTable from "./ui/AllBillingsTable";
import ContractorsTable from "./ui/ContractorsTable";
import CreateContractorForm from "./ui/CreateContractorForm";
const MainUserPage = () => {
  return (
    <>
      <div className="flex text-4xl justify-center text-center">
        MainUserPage
      </div>
      <ContractorsTable />
      <CreateContractorForm />
      <AllBillingsTable />
    </>
  );
};

export default MainUserPage;
