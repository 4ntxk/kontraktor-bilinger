import ContractorsTable from "../ContractorsTable";
import ContractorForm from "../ui/ContractorForm";

const ContractorsPage = () => {
  return (
    <>
      <div className="bg-myblack font-roboto  h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="w-full h-screen flex flex-col justify-center items-center border">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-mywhite">Welcome back!</h2>
            <p className="text-mywhite">
              Here&apos;s a list of your contractors!
            </p>
          </div>
          <ContractorsTable />
          {/* <ContractorForm /> */}
        </div>
      </div>
    </>
  );
};

export default ContractorsPage;
