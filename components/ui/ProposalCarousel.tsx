"use client"
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import ProposalCard from "./ProposalCard"

import { ethers } from "ethers";
import riverProtocolABI from "@/abi/riverProtocol.json"

interface ProposalCardProps {
  imageSrc: string;
  name: string;
  description: string;
  creationDate: number; // Unix timestamp
  yesVotes: number;
  noVotes: number;
  amountRequested: string; // Amount in ETH
}

const ProposalCarousel = () => {
  const [proposalDetails, setProposals] = useState<ProposalCardProps[]>([])
  const [delegates, setDelegates] = useState<string[]>([
    "0xa84b8512e1dAd22d022A47FeEfC8CC84658542d9",
    "0xb337349cfa848A07dC3081380F4c87d2Cb597254"
  ])
  useEffect(() => {
    (async () => {
      // Replace this with your actual data fetching logic
      const proposalContract = new ethers.Contract(
        "0x146FC00308417C04d013b6E8bb2FC6Be9fF50bC8",
        riverProtocolABI,
        new ethers.JsonRpcProvider(
          "https://testnet.rpc.metall2.com/"
        )
      );
      const proposals = await proposalContract.getProposals()
      setProposals(await Promise.all(proposals.map(async (proposal: any) => {
        const data: any = await (await fetch(proposal.description)).json();
        console.log(data)
        const proposalData: ProposalCardProps = {
          imageSrc: data.coverImage,
          name: data.name,
          description: data.description,
          creationDate: parseInt(proposal.lastVoteCheck), // Adjust as necessary
          yesVotes: parseInt(proposal.yesVotes),
          noVotes: parseInt(proposal.noVotes),
          amountRequested: ethers.formatUnits(proposal.amountRequested, 'ether')
        };
        console.log(proposalData)
        return proposalData
      })))
      console.log(proposalDetails)
    })()
  }, [])
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
    return (

        <Carousel 
            className="w-full"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="w-full">
            {proposalDetails.length > 0 && proposalDetails.map((proposal, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <ProposalCard imageSrc={proposal.imageSrc} amountRequested={proposal.amountRequested} description={proposal.description} creationDate={proposal.creationDate} name={proposal.name} noVotes={proposal.noVotes} yesVotes={proposal.yesVotes} onVote={() => {}} onDelegate={() => {}} onWithdraw={() => {}} delegates={delegates}/>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
    )
}

export default ProposalCarousel