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


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
  <Navbar />
  <div className="grid grid-cols-3 grid-rows-2 w-full h-[90vh] gap-5 p-5">
    <Card className="col-span-2 h-full">
      <CardHeader>
        <CardTitle className="text-2xl lg:xl">Recent Proposals</CardTitle>
      </CardHeader>
      <CardContent>
        <ProposalCarousel />
      </CardContent>
    </Card>

    <Bridge/>

    <Card className="col-span-2 h-full">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>

    <Card className="h-full">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  </div>
</main>

  );
}
