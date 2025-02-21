
import { useAccount, useContractRead } from "wagmi";
import { CONTRACTS } from "../config/contracts";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { formatEther } from "viem";
import { Link } from "react-router-dom";

type ProjectData = readonly [
  id: bigint,
  name: string,
  description: string,
  owner: `0x${string}`,
  subscriptionEndTime: bigint,
  isListed: boolean,
  totalDonations: bigint
];

type DonationData = readonly [
  donor: `0x${string}`,
  amount: bigint,
  projectId: bigint,
  timestamp: bigint
];

export default function Profile() {
  const { address } = useAccount();

  const { data: projectIds, isLoading: isLoadingProjects } = useContractRead({
    ...CONTRACTS.PROJECT_LISTING,
    functionName: "ownerProjects",
    args: [address as `0x${string}`, 0n],
    query: {
      enabled: !!address,
    },
  });

  // Get DAO membership status
  const { data: memberData } = useContractRead({
    ...CONTRACTS.DAO,
    functionName: "members",
    args: [address as `0x${string}`],
    query: {
      enabled: !!address,
    },
  });

  // Get user's donations
  const { data: donorDonations, isLoading: isLoadingDonations } = useContractRead({
    ...CONTRACTS.DONATE,
    functionName: "donorDonations",
    args: [address as `0x${string}`, 0n],
    query: {
      enabled: !!address,
    },
  });

  // Get project details for each project ID
  const { data: projectData, isLoading: isLoadingProjectDetails } = useContractRead({
    ...CONTRACTS.PROJECT_LISTING,
    functionName: "projects",
    args: [projectIds ? projectIds[0] : 0n],
    query: {
      enabled: !!projectIds && projectIds.length > 0,
    },
  });

  if (!address) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>
        <Card className="p-6">
          <p className="text-gray-600">Please connect your wallet to view your profile.</p>
          <Button className="mt-4 bg-primary-600 hover:bg-primary-700">
            Connect Wallet
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">
          {address.slice(0, 6)}...{address.slice(-4)}
        </p>
      </div>
      
      <div className="grid gap-6">
        {/* Projects Section */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Projects</h2>
            <Link to="/projects">
              <Button variant="outline">List New Project</Button>
            </Link>
          </div>

          {isLoadingProjects || isLoadingProjectDetails ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : projectData ? (
            <div className="space-y-4">
              {[projectData].map((project: ProjectData) => (
                <div
                  key={project[0].toString()}
                  className="border rounded-lg p-4 hover:border-primary-200 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{project[1]}</h3>
                      <p className="text-sm text-gray-600 mt-1">{project[2]}</p>
                    </div>
                    <span className={`px-2 py-1 text-sm rounded-full ${
                      project[5] ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {project[5] ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Total Donations: {formatEther(project[6])} ETH
                    </span>
                    <Link to={`/project/${project[0].toString()}`}>
                      <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No projects found. Start by listing a new project!</p>
          )}
        </Card>

        {/* Donations Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Donations</h2>
          {isLoadingDonations ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : donorDonations ? (
            <div className="space-y-4">
              {[donorDonations].map((donation: DonationData) => (
                <div
                  key={`${donation[2]}-${donation[3]}`}
                  className="border rounded-lg p-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Project #{donation[2].toString()}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(Number(donation[3]) * 1000).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="font-medium text-primary-600">
                      {formatEther(donation[1])} ETH
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No donations found.</p>
          )}
        </Card>

        {/* DAO Activity Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">DAO Membership</h2>
          {memberData ? (
            <div>
              {memberData.isMember ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-green-600 font-medium">Active Member</span>
                  </div>
                  <p className="text-gray-600">
                    Staked Amount: {formatEther(memberData.stakedAmount)} ETH
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-600">You are not a DAO member yet.</p>
                  <Link to="/dao">
                    <Button className="bg-primary-600 hover:bg-primary-700">
                      Join DAO
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Skeleton className="h-12 w-full" />
          )}
        </Card>
      </div>
    </div>
  );
}
