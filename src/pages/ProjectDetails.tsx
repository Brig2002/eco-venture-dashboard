
import { useParams } from "react-router-dom";
import { useContractRead } from "wagmi";
import { CONTRACTS } from "../config/contracts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type ProjectData = readonly [
  id: bigint,
  name: string,
  description: string,
  owner: `0x${string}`,
  subscriptionEndTime: bigint,
  isListed: boolean,
  totalDonations: bigint
];

export default function ProjectDetails() {
  const { id } = useParams();

  const { data: project, isLoading } = useContractRead({
    ...CONTRACTS.PROJECT_LISTING,
    functionName: "projects",
    args: [BigInt(id || "0")],
    query: {
      enabled: !!id,
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Skeleton className="h-8 w-1/3 mb-8" />
        <Card className="p-6">
          <Skeleton className="h-32 w-full mb-4" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </Card>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Project not found</h1>
      </div>
    );
  }

  const projectData = project as ProjectData;
  const [id_, name, description, owner, subscriptionEndTime, isListed, totalDonations] = projectData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{name}</h1>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-gray-600 mb-6">{description}</p>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="default" className="bg-primary-600 hover:bg-primary-700">
              Donate
            </Button>
            {owner === "0x0" && (
              <Button variant="outline">Renew Subscription</Button>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Owner</dt>
              <dd className="mt-1 text-sm text-gray-900">{owner}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Total Donations</dt>
              <dd className="mt-1 text-sm text-gray-900">{totalDonations.toString()} ETH</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {isListed ? "Listed" : "Delisted"}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Subscription Ends</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(Number(subscriptionEndTime) * 1000).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  );
}
