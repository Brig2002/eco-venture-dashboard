
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { CONTRACTS } from "../config/contracts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { formatEther, parseEther } from "viem";

export default function DAO() {
  const { address } = useAccount();
  const { toast } = useToast();

  const { data: minStakeAmount } = useContractRead({
    ...CONTRACTS.DAO,
    functionName: "minStakeAmount",
  });

  const { data: memberData } = useContractRead({
    ...CONTRACTS.DAO,
    functionName: "members",
    args: [address as `0x${string}`],
  });

  const { write: joinDAO, isLoading: isJoining } = useContractWrite({
    ...CONTRACTS.DAO,
    functionName: "joinDAO",
  });

  const handleJoinDAO = async () => {
    if (!address) {
      toast({
        title: "Error",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
      return;
    }

    try {
      joinDAO({
        value: minStakeAmount, // Use the minimum stake amount from the contract
      });

      toast({
        title: "Success",
        description: "Successfully joined the DAO!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join DAO. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isMember = memberData?.[1] || false;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">DAO Governance</h1>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Join DAO</h2>
          <p className="text-gray-600 mb-4">
            Minimum stake required: {minStakeAmount ? formatEther(minStakeAmount) : "Loading..."} ETH
          </p>
          {!isMember ? (
            <Button
              variant="default"
              className="bg-primary-600 hover:bg-primary-700"
              onClick={handleJoinDAO}
              disabled={isJoining || !address}
            >
              {isJoining ? "Joining..." : "Join DAO"}
            </Button>
          ) : (
            <p className="text-green-600">You are already a DAO member!</p>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Active Proposals</h2>
          <p className="text-gray-600">No active proposals</p>
        </Card>
      </div>
    </div>
  );
}
