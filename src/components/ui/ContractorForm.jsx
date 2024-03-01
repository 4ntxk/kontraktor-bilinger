import { useState } from "react";
import { useCreateContractorMutation } from "../../app/api/apiSlice";

// eslint-disable-next-line react/prop-types
const ContractorForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    salary: 0,
    isOvertimePaid: false,
    monthlyHourLimit: 0,
    overtimeMultiplier: 1,
    contractorHourPrice: 0,
    hourlyRate: 0,
    contractType: "",
  });

  const [createContractor, { isLoading, isError }] =
    useCreateContractorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmitContractorForm = async (e) => {
    e.preventDefault();
    try {
      await createContractor(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <form
        onSubmit={handleSubmitContractorForm}
        className="space-y-6 border-primary border-2 p-2"
      >
        <div className="flex">
          <label
            htmlFor="firstName"
            className="text-sm font-medium text-gray-900 text-nowrap pr-2"
          >
            First Name:
          </label>
          <input
            className="px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="flex">
          <label
            htmlFor="lastName"
            className="text-sm font-medium text-gray-900 text-nowrap pr-2"
          >
            Last Name:
          </label>
          <input
            className="px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="flex">
          <label
            htmlFor="salary"
            className="text-sm font-medium text-gray-900 text-nowrap pr-2"
          >
            Salary:
          </label>
          <input
            className="px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>
        <div className="flex">
          <label
            htmlFor="isOvertimePaid"
            className="text-sm font-medium text-gray-900 text-nowrap pr-2"
          >
            Is Overtime Paid:
          </label>
          <input
            className="px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            type="checkbox"
            id="isOvertimePaid"
            name="isOvertimePaid"
            checked={formData.isOvertimePaid}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                isOvertimePaid: e.target.checked,
              }))
            }
          />
        </div>
        <div className="flex">
          <label
            htmlFor="monthlyHourLimit"
            className="text-sm font-medium text-gray-900 text-nowrap pr-2"
          >
            monthlyHourLimit:
          </label>
          <input
            className="px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            type="number"
            id="monthlyHourLimit"
            name="monthlyHourLimit"
            value={formData.monthlyHourLimit}
            onChange={handleChange}
          />
        </div>
        <div className="flex">
          <label
            htmlFor="overtimeMultiplier"
            className="text-sm font-medium text-gray-900 text-nowrap pr-2"
          >
            overtimeMultiplier:
          </label>
          <input
            className="px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            type="number"
            id="overtimeMultiplier"
            name="overtimeMultiplier"
            value={formData.overtimeMultiplier}
            onChange={handleChange}
          />
        </div>
        <div className="flex">
          <label
            htmlFor="contractorHourPrice"
            className="text-sm font-medium text-gray-900 text-nowrap pr-2"
          >
            contractorHourPrice:
          </label>
          <input
            className="px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            type="number"
            id="contractorHourPrice"
            name="contractorHourPrice"
            value={formData.contractorHourPrice}
            onChange={handleChange}
          />
        </div>
        <div className="flex">
          <label
            htmlFor="hourlyRate"
            className="text-sm font-medium text-gray-900 text-nowrap pr-2"
          >
            hourlyRate:
          </label>
          <input
            className="px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            type="number"
            id="hourlyRate"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleChange}
          />
        </div>
        <div className="flex">
          <label
            htmlFor="contractType"
            className="text-sm font-medium text-gray-900 text-nowrap pr-2"
          >
            Contract Type:
          </label>
          <select
            id="contractType"
            name="contractType"
            value={formData.contractType}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                contractType: e.target.value,
              }))
            }
          >
            <option value="1">Contract of Employment</option>
            <option value="2">Contract of Mandate</option>
            <option value="3">Contract B2B</option>
          </select>
        </div>

        <button
          className="flex justify-center border-2 border-primary p-2"
          type="submit"
          disabled={isLoading}
        >
          Submit
        </button>
        {isError && <div>Error creating contractor</div>}
      </form>
    </div>
  );
};

export default ContractorForm;
