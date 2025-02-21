
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContractRead, useContractWrite } from "wagmi";
import { CONTRACTS, ProjectData } from "../config/contracts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { formatEther, parseEther } from "viem";

export default function Projects() {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const { toast } = useToast();

  // Get total number of projects
  const { data: projectCount } = useContractRead({
    ...CONTRACTS.PROJECT_LISTING,
    functionName: "projectCounter",
  });

  // Get latest project details
  const { data: latestProject, isLoading: isLoadingProject } = useContractRead({
    ...CONTRACTS.PROJECT_LISTING,
    functionName: "projects",
    args: [projectCount ? projectCount - 1n : 0n],
    enabled: projectCount !== undefined && projectCount > 0n,
  });

  // Contract write function for listing new project
  const { writeAsync: listProject } = useContractWrite({
    ...CONTRACTS.PROJECT_LISTING,
    functionName: "listProject",
  });

  const handleListProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await listProject({
        args: [formData.name, formData.description],
        value: parseEther("0.1"), // Example subscription fee
      });
      
      toast({
        title: "Success",
        description: "Project submitted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderProjectCard = (project: ProjectData) => {
    const [id, name, description, owner, subscriptionEndTime, isListed, totalDonations] = project;
    
    return (
      <Card key={id.toString()} className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Ends: {new Date(Number(subscriptionEndTime) * 1000).toLocaleDateString()}
          </span>
          <span className={`px-2 py-1 text-sm rounded-full ${
            isListed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {isListed ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-primary-600 font-semibold">
            {formatEther(totalDonations)} ETH raised
          </span>
          <Link to={`/project/${id.toString()}`}>
            <Button variant="outline">View Details</Button>
          </Link>
        </div>
      </Card>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-2">Support sustainable initiatives</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary-600 hover:bg-primary-700">
              List New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>List a New Project</DialogTitle>
              <DialogDescription>
                Fill out the details below to submit your project for DAO approval.
                A subscription fee of 0.1 ETH is required.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleListProject} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your project"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700">
                Submit Project (0.1 ETH)
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoadingProject ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-32 w-full mb-4" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </Card>
          ))
        ) : latestProject ? (
          renderProjectCard(latestProject as unknown as ProjectData)
        ) : (
          <Card className="p-6">
            <p className="text-gray-600">No projects found</p>
          </Card>
        )}
      </div>
    </div>
  );
}
