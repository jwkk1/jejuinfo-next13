import LoginComponent from "@/components/login/logincomponent";
import MainLayout from "@/components/mainLayout/mainLayout";
import { useSession } from "next-auth/react";

export default function Login() {
    // let session  = useSession();
    return (
        <MainLayout>
            <LoginComponent />
        </MainLayout>
    );
}