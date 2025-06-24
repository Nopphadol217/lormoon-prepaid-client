import { SignOutButton } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast.ts";

const SignOutLink = () => {
    const { toast } = useToast();

    const showToast = () => {
      toast({
        title: "Success",
        description: "This is a success message.",
      });
    };

  return (
    <SignOutButton redirectUrl="/" >
      <button onClick={showToast}>Logout</button>
    </SignOutButton>
  );
};

export default SignOutLink;
