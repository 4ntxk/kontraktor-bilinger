import { useRef, useState } from "react";
import { useGetContractorByIdQuery } from "../../app/api/apiSlice";

const SingleContractorTable = () => {
  const userRef = useRef();
  const [Id, setId] = useState("");

  const { data: contractor, error, isLoading } = useGetContractorByIdQuery(Id);

  const handleUserInput = (e) => setId(e.target.value);

  return (
    <div className="flex items-center justify-center mt-10">
      <form className="space-y-6 border-primary border-2 p-2">
        <div>
          <label
            htmlFor="Id"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Give Id
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="Id"
              ref={userRef}
              value={Id}
              onChange={handleUserInput}
              autoComplete="off"
              required
              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div></div>
      </form>

      <div className="flex items-center justify-center mt-10">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-xl border-2 border-primary">
              <thead>
                <tr className="bg-blue-gray-100 text-gray-700">
                  <th className="py-3 px-4 text-left">DATA CATEGORY</th>
                  <th className="py-3 px-4 text-left">DATA</th>
                </tr>
              </thead>

              <tbody className="text-blue-gray-900">
                {contractor &&
                  Object.entries(contractor.data).map(([key, value]) => (
                    <tr className="border-b border-blue-gray-200" key={key}>
                      <td className="py-3 px-4">{key}</td>
                      <td className="py-3 px-4">
                        {key === "contractorBillings" ? (
                          <ul>
                            {value.map((billing, index) => (
                              <li key={index}>
                                <strong>Billing {index + 1}</strong>:{" "}
                                {billing.year} - {billing.month}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          value
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleContractorTable;
