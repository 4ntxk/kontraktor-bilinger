import ContractorForm from "../ui/ContractorForm";
import ContractorsTable from "../ui/ContractorsTable";

const ContractorsPage = () => {
  return (
    <>
      <div className="bg-mywhite font-roboto">
        <div className="flex text-4xl justify-center text-center">
          ContractorsPage
        </div>

        <div className="w-full h-screen flex flex-col justify-center items-center">
          <ContractorsTable />
          <ContractorForm />
        </div>
      </div>
    </>
  );
};

export default ContractorsPage;