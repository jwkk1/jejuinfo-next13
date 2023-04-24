import LoginComponent from "@/components/login/logincomponent";
import { useSession } from "next-auth/react";

export default function Login() {
    // let session  = useSession();
    return (
        <>
            <LoginComponent />
        </>
    );
}