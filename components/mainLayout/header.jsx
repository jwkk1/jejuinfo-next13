import Link from "next/link";
import {getServerSession} from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LoginBtn from "./loginBtn";
import LogoutBtn from "./logoutBtn";
import LoginCheck from "./loginCheck";

export default async function Header() {
    const user = await getServerSession(authOptions) || '';
    
    return(
        <>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link href='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <img className="w-10 h-10 text-white rounded-full" src="/jeju.png" />
                        <span className="ml-3 text-xl">Jeju Info</span>
                    </Link>
                    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                        <Link href={{pathname:'/search', query:{category:'c1'}}} className="mr-5 hover:text-gray-900">여행지 검색</Link>
                        <Link href='/mypage' className="mr-5 hover:text-gray-900">내 여행지</Link>
                    </nav>
                    
                    {
                        user 
                        ? <><p className="mr-5">{user.user.email}</p><LogoutBtn /></>
                        : <LoginBtn />
                    }
                    <LoginCheck user={user.user} />
                </div>
            </header>
        </>
    )
}