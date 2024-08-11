"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ethers } from "ethers"
import riverProtocolABI from "@/abi/riverProtocol.json"
import { useWalletContext } from "@/context/walletContext"
import { useState } from "react"

export function CreateProposal() {
    const { signer } = useWalletContext();
    const [formData, setFormData] = useState({
        amount: "",
        details: ""
    });
    const createProposal = async () => {
        const riverContract = new ethers.Contract(
            "0x146FC00308417C04d013b6E8bb2FC6Be9fF50bC8",
            riverProtocolABI,
            signer
        );
        const tx = await riverContract.createProposal(formData.details, formData.details, ethers.parseEther(formData.amount));
        await tx.wait()
        setFormData({
            amount: "",
            details: ""
        })
    }
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create a Proposal</CardTitle>
        <CardDescription>
          Enter your proposal details
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="amount">Requested Amount (in ETH)</Label>
          <Input id="amount" type="number" placeholder="Ex - 1.25" value={formData.amount} onChange={(e) => {
            setFormData({
                ...formData,
                amount: e.target.value
            })
          }}/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="details">Proposal Details (IPFS url)</Label>
          <Input id="details" placeholder="Upload details to IPFS and paste url" value={formData.details} onChange={(e) => {
            setFormData({
                ...formData,
                details: e.target.value
            })
          }}/>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={createProposal}>Create Proposal</Button>
      </CardFooter>
    </Card>
  )
}