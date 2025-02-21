
import { useContractRead } from "wagmi";
import { CONTRACTS } from "../config/contracts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DAO() {
  const { data: minStakeAmount } = useContractRead({
    ...CONTRACTS.DAO,
    functionName: "minStakeAmount",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">DAO Governance</h1>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Join DAO</h2>
          <p className="text-gray-600 mb-4">
            Minimum stake required: {minStakeAmount ? minStakeAmount.toString() : "Loading..."} ETH
          </p>
          <Button variant="default" className="bg-primary-600 hover:bg-primary-700">
            Join DAO
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Active Proposals</h2>
          <p className="text-gray-600">No active proposals</p>
        </Card>
      </div>
    </div>
  );
}
