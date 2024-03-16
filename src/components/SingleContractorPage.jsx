import SingleContractorCardInfo from "./ui/SingleContractorCardInfo";
import SingleContractorAllBillingsCard from "./SingleContractorAllBillingsCard";
import { useGetContractorByIdQuery } from "@/app/api/apiSlice";
import { useParams } from "react-router-dom";
const SingleContractorPage = () => {
  const { id } = useParams();
  const { data: contractor, error, isLoading } = useGetContractorByIdQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!contractor) {
    return <div>No contractor found.</div>;
  }

  return (
    <>
      <div className="w-full">
        <SingleContractorCardInfo contractor={contractor} />
        <SingleContractorAllBillingsCard contractor={contractor} />
      </div>
    </>
  );
};

export default SingleContractorPage;
