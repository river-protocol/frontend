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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Bridge() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl lg:xl">Bridge ETH Across OP Ecosystem</CardTitle>
        <CardDescription>
          Bridge ETH from Ethereum to the OP ecosystem and back across the most used L2s.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="from">From</Label>
            <Select defaultValue="sepolia">
              <SelectTrigger id="from">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metal">Metal L2 Testnet</SelectItem>
                <SelectItem value="op-sepolia">OP Sepolia</SelectItem>
                <SelectItem value="sepolia">Sepolia</SelectItem>
                <SelectItem value="mode">Mode Testnet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="to">To</Label>
            <Select defaultValue="metal">
              <SelectTrigger
                id="to"
              >
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metal">Metal L2 Testnet</SelectItem>
                <SelectItem value="op-sepolia">OP Sepolia</SelectItem>
                <SelectItem value="sepolia">Sepolia</SelectItem>
                <SelectItem value="mode">Mode Testnet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="value">Value</Label>
          <Input id="value" placeholder="Ex - 0.1 (in ETH)" type="number" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled>Coming Soon</Button>
      </CardFooter>
    </Card>
  )
}