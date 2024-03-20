import BillingsTable from "../BillingsTable";

const BillingPage = () => {
  return (
    <>
      <div className="bg-myblack font-roboto h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="w-full h-screen flex flex-col justify-center items-center border">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-mywhite">Hi again!</h2>
            <p className="text-mywhite">
              Here&apos;s a list of all your contractors billings!
            </p>
          </div>
          <BillingsTable />
        </div>
      </div>
    </>
  );
};

export default BillingPage;
