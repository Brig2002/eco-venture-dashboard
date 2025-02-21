
import { daoABI, donateABI, projectListingABI } from './abis';

export const CONTRACTS = {
  DAO: {
    address: "0xA5124D1c1f6e06F6956f77DE2917983D93840993",
    abi: daoABI,
  },
  DONATE: {
    address: "0x4C597Bc2CC4ca87efC738EFDeFD487E27833df4a",
    abi: donateABI,
  },
  PROJECT_LISTING: {
    address: "0x1955E7bFed7499c0a71394976Beb8d8AC33ABcd7",
    abi: projectListingABI,
  },
} as const;
