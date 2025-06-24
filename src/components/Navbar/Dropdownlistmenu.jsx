
import { AlignLeft } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Usericon from "./Usericon";
import { Button } from "../ui/button";
import {links} from '@/utils/links'
import { Link } from "react-router";
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import SignOutLink from './SignOutLink';



const Dropdownlistmenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
      <AlignLeft />
      <Usericon/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />


        {
            links.map((item,index)=>{
                console.log(item.href)
                return <DropdownMenuItem key={index}><Link to={item.href}>{item.label}</Link></DropdownMenuItem>
            })
        }

        <DropdownMenuSeparator />
        <SignedOut>
            <DropdownMenuItem>
                {/* กรณีไม่ได้ LOGIN */}
                <SignInButton mode="modal">
                    <button>Login</button>
                </SignInButton>
            </DropdownMenuItem>

            <DropdownMenuItem>
                <SignUpButton mode="modal">
                    <button>Register</button>
                </SignUpButton>
            </DropdownMenuItem>
        </SignedOut>

      <SignedIn>
        <DropdownMenuItem>
        {/* <UserButton /> */}
        {/* <SignOutButton/> */}
       <SignOutLink/>
        </DropdownMenuItem>
      </SignedIn>
        
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdownlistmenu;
