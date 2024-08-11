"use client"
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


import { Button, buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useTurnkeyContext } from "@/context/turnkeyContext";
import { useWalletContext } from "@/context/walletContext";

import Image from "next/image";


interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#home",
    label: "Home",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { createSubOrgAndWallet, login } = useTurnkeyContext()
  const { connectWallet, balance, signer } = useWalletContext()
  const [ walletAddress, setAddress ] = useState<string>("")
  useEffect(() => {
    const getAddress = async () => {
      if (signer) {
        const address = await signer.getAddress()
        setAddress(address)
      }
      return ""
    }
    getAddress()
  }, [signer])
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex"
            >
              River Protocol
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">

            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    River Protocol
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  <Drawer>
                    <DrawerTrigger className={`border ${buttonVariants({ variant: "secondary" })}`}>{!signer ? "Login" : "View Address"}</DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle className="text-center text-3xl">{!signer ? "Get Started with River Protocol" : "Use the address given below"}</DrawerTitle>
                        <DrawerDescription className="text-center text-xl">{!signer ? "Choose from the following options." : walletAddress}</DrawerDescription>
                      </DrawerHeader>
                      {!signer && (
                        <DrawerFooter>
                          <div className="flex flex-col gap-2 w-96 justify-center mx-auto">
                            <button
                              onClick={connectWallet}
                              className={`border ${buttonVariants({ variant: "secondary" })} flex flex-1 flex-row justify-between items-center text-xl`}
                            >
                              <span>Use Metamask</span>
                              <Image src={"metamask.svg"} alt="metamask" width={24} height={24} />
                            </button>
                            <button
                              onClick={login}
                              className={`border ${buttonVariants({ variant: "secondary" })} flex flex-1 flex-row justify-between items-center text-xl`}
                            >
                              <span>Login using Passkey</span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                              </svg>
                            </button>
                            <button
                              onClick={createSubOrgAndWallet}
                              className={`border ${buttonVariants({ variant: "secondary" })} flex flex-1 flex-row justify-between items-center text-xl`}
                            >
                              <span>Create Passkey</span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                              </svg>
                            </button>
                          </div>
                        </DrawerFooter>
                      )}
                    </DrawerContent>
                  </Drawer>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
          <Drawer>
            <DrawerTrigger className={`border ${buttonVariants({ variant: "secondary" })}`}>Login</DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="text-center text-3xl">Get Started with River Protocol</DrawerTitle>
                <DrawerDescription className="text-center text-xl">Choose from the following options.</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <div className="flex flex-col gap-2 w-96 justify-center mx-auto">
                  <button
                    onClick={connectWallet}
                    className={`border ${buttonVariants({ variant: "secondary" })} flex flex-1 flex-row justify-between items-center text-xl`}
                  >
                    <span>Use Metamask</span>
                    <Image src={"metamask.svg"} alt="metamask" width={24} height={24} />
                  </button>
                  <button
                    onClick={login}
                    className={`border ${buttonVariants({ variant: "secondary" })} flex flex-1 flex-row justify-between items-center text-xl`}
                  >
                    <span>Login using Passkey</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                    </svg>
                  </button>
                  <button
                    onClick={createSubOrgAndWallet}
                    className={`border ${buttonVariants({ variant: "secondary" })} flex flex-1 flex-row justify-between items-center text-xl`}
                  >
                    <span>Create Passkey</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                    </svg>
                  </button>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

            

          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};