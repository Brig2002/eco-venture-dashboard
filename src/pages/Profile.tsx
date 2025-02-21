
import { useAccount, useContractRead } from "wagmi";
import { CONTRACTS } from "../config/contracts";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Profile() {
  const { address } = useAccount();

  const { data: projectData, isLoading: isLoadingProjects } = useContractRead({
    ...CONTRACTS.PROJECT_LISTING,
    functionName: "ownerProjects",
    args: [address as `0x${string}`, 0n],
    query: {
      enabled: !!address,
    },
  });

  if (!address) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>
        <p className="text-gray-600">Please connect your wallet to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>
      
      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
          {isLoadingProjects ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : projectData ? (
            <div>
              <p>Projects will be displayed here</p>
            </div>
          ) : (
            <p className="text-gray-600">No projects found.</p>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Donations</h2>
          <p className="text-gray-600">Donation history will be displayed here</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">DAO Activity</h2>
          <p className="text-gray-600">DAO voting history will be displayed here</p>
        </Card>
      </div>
    </div>
  );
}
