
export const CONTRACTS = {
  PROJECT_LISTING: {
    address: "0x1955E7bFed7499c0a71394976Beb8d8AC33ABcd7",
    abi: [
      {
        inputs: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "description", type: "string" }
        ],
        name: "listProject",
        outputs: [],
        stateMutability: "payable",
        type: "function"
      },
      {
        inputs: [],
        name: "projectCounter",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "projects",
        outputs: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "description", type: "string" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "subscriptionEndTime", type: "uint256" },
          { internalType: "bool", name: "isListed", type: "bool" },
          { internalType: "uint256", name: "totalDonations", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "address", name: "", type: "address" },
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        name: "ownerProjects",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
      }
    ],
  } as const,
  DAO: {
    address: "0xA5124D1c1f6e06F6956f77DE2917983D93840993",
    abi: [
      {
        inputs: [],
        name: "joinDAO",
        outputs: [],
        stateMutability: "payable",
        type: "function"
      },
      {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "members",
        outputs: [
          { internalType: "uint256", name: "stakedAmount", type: "uint256" },
          { internalType: "bool", name: "isMember", type: "bool" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "minStakeAmount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "uint256", name: "projectId", type: "uint256" },
          { internalType: "bool", name: "vote", type: "bool" }
        ],
        name: "voteOnProject",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      }
    ],
  } as const,
  DONATE: {
    address: "0x4C597Bc2CC4ca87efC738EFDeFD487E27833df4a",
    abi: [
      {
        inputs: [{ internalType: "uint256", name: "projectId", type: "uint256" }],
        name: "donateToProject",
        outputs: [],
        stateMutability: "payable",
        type: "function"
      },
      {
        inputs: [
          { internalType: "address", name: "", type: "address" },
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        name: "donorDonations",
        outputs: [
          { internalType: "address", name: "donor", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "projectId", type: "uint256" },
          { internalType: "uint256", name: "timestamp", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      }
    ],
  } as const,
} as const;

// Type definitions
export type ProjectData = readonly [
  id: bigint,
  name: string,
  description: string,
  owner: `0x${string}`,
  subscriptionEndTime: bigint,
  isListed: boolean,
  totalDonations: bigint
];

export type DonationData = readonly [
  donor: `0x${string}`,
  amount: bigint,
  projectId: bigint,
  timestamp: bigint
];

export type MemberData = readonly [
  stakedAmount: bigint,
  isMember: boolean
];
