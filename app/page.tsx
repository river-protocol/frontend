import { Navbar } from "@/components/ui/Navbar";
import Image from "next/image";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ProposalCarousel from "@/components/ui/ProposalCarousel";
import { Bridge } from "@/components/ui/Bridge";
import { CreateProposal } from "@/components/ui/CreateProposal";

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
  <Navbar />
  <div className="grid grid-cols-3 grid-rows-2 w-full h-[90vh] gap-5 p-5">
    <Card className="col-span-2 row-span-2 h-full">
      <CardHeader>
        <CardTitle className="text-2xl lg:xl">Recent Proposals</CardTitle>
      </CardHeader>
      <CardContent>
        <ProposalCarousel />
      </CardContent>
    </Card>

    <Bridge/>

    <CreateProposal />
  </div>
</main>

  );
}

