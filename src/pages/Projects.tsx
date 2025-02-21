
import { useContractRead } from "wagmi";
import { CONTRACTS } from "../config/contracts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Projects() {
  const { data: projectCounter, isLoading: isLoadingCounter } = useContractRead({
    ...CONTRACTS.PROJECT_LISTING,
    functionName: "projectCounter",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        <Button variant="default" className="bg-primary-600 hover:bg-primary-700">
          List New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoadingCounter ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-32 w-full mb-4" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </Card>
          ))
        ) : (
          <Card className="p-6">
            <p className="text-gray-600">Projects will be displayed here</p>
          </Card>
        )}
      </div>
    </div>
  );
}
