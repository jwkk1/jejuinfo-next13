import Link from "next/link";
import {getServerSession} from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LoginBtn from "./loginBtn";
import LogoutBtn from "./logoutBtn";

export default async function Header() {
    const user = await getServerSession(authOptions);
    return(
        <>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link href='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl">Jeju Info</span>
                    </Link>
                    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                        <Link href={{pathname:'/search', query:{category:'c1'}}} className="mr-5 hover:text-gray-900">여행지 검색</Link>
                        <Link href='/mypage' className="mr-5 hover:text-gray-900">내 여행지</Link>
                    </nav>
                    {
                        user 
                        ? <LogoutBtn />
                        : <LoginBtn />
                    }
                    
                </div>
            </header>
        </>
    )
}