import { useGetContractorsQuery } from "../../app/api/apiSlice";

// eslint-disable-next-line react/prop-types
const AllContractorsTable = () => {
  const { data: contractors = [], error, isLoading } = useGetContractorsQuery();

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="flex items-center justify-center mt-10">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-xl border-2 border-primary">
              <thead>
                <tr className="bg-blue-gray-100 text-gray-700">
                  <th className="py-3 px-4 text-left">First Name</th>
                  <th className="py-3 px-4 text-left">Last name</th>
                  <th className="py-3 px-4 text-left">Contract type</th>
                  <th className="py-3 px-4 text-left">Profit</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="text-blue-gray-900">
                {contractors.data &&
                  contractors.data.map((contractor) => (
                    <tr
                      className="border-b border-blue-gray-200"
                      key={contractor.id}
                    >
                      <td className="py-3 px-4">{contractor.firstName}</td>
                      <td>{contractor.lastName}</td>
                      <td>{contractor.contractType}</td>
                      <td>{contractor.contractorBillings[0]?.profit ?? "0"}</td>
                      <td className="py-3 px-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}

                <tr className="border-b border-blue-gray-200">
                  <td className="py-3 px-4 font-medium">
                    Total profit z niewolników
                  </td>
                  <td className="py-3 px-4"></td>
                  <td className="py-3 px-4"></td>
                  <td className="py-3 px-4 font-medium">
                    total profit albo chuj cos bedzie nie wiem
                  </td>
                  <td className="py-3 px-4"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AllContractorsTable;
