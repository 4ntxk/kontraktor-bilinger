import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useGetContractorBillingByIdQuery } from "@/app/api/apiSlice";

const SingleBillingPage = () => {
  const { id } = useParams();
  const {
    data: billing,
    error,
    isLoading,
  } = useGetContractorBillingByIdQuery(id);

  return (
    <>
      <div className="font-roboto flex justify-center items-center h-screen bg-myblack">
        <Card className="bg-myblack text-mywhite mx-10">
          <div className="p-2 text-center"></div>
          <CardHeader>
            <CardTitle>billing id: {billing.data.id}</CardTitle>
            <CardDescription className="text-mygray">
              manage your contractor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mx-10 flex justify-between items-center my-2">
              <p className="p-2">hourly rate: </p>
              <Dialog>
                <DialogTrigger className="bg-myblack border hover:bg-mygray text-sm rounded text-mywhite p-2">
                  CHANGE
                </DialogTrigger>
                <DialogContent className="bg-myblack text-mywhite">
                  <Button
                    className="bg-myblack border text-mywhite hover:bg-mygray"
                    type="submit"
                  >
                    Submit
                  </Button>

                  <DialogHeader></DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <Separator />
            <div className="mx-10 flex justify-between items-center my-2">
              <p className="p-2">monthly hour limit:</p>
              <Button className="bg-mygray">CHANGE</Button>
            </div>
            <div className="mx-10 flex justify-between items-center my-2">
              <p className="p-2">overtime critical strike multiplier: </p>
              <Button>CHANGE</Button>
            </div>
            <div className="mx-10 flex justify-between items-center my-2">
              <p className="p-2">hour price:</p>
              <Button>CHANGE</Button>
            </div>
            <div className="mx-10 flex justify-between items-center my-2">
              <p className="p-2">overtime paid?:</p>
              <Button>CHANGE</Button>
            </div>
            <div className="mx-10 flex justify-between items-center my-2">
              <p className="p-2">contract type:</p>
              <Button>CHANGE</Button>
            </div>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger className="bg-red-800 hover:bg-red-600 border text-sm rounded text-mywhite p-2">
                DELETE
              </DialogTrigger>
              <DialogContent className="bg-myblack text-mywhite">
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This process is irreversable.
                </DialogDescription>
                <DialogClose asChild>
                  <Button type="button" variant="destructive">
                    Yes
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="bg-myblack text-mywhite border hover:bg-mygray"
                  >
                    No
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
export default SingleBillingPage;
