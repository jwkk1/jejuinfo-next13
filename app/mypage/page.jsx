import MyList from "@/components/mypage/myList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LoginComponent from "@/components/login/logincomponent";


export default async function MypageList() {
    const user = await getServerSession(authOptions) || '';

    return (
        <>
               {
                    user ==='' 
                    ? <LoginComponent />
                    :  <section className="text-gray-600 body-font">
                            <div className="container px-5 py-24 mx-auto">
                                <div className="flex flex-wrap w-full mb-10">
                                    <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                                    <   h1 className="text-2xl mb-4 text-gray-900">내 여행지</h1>
                                       <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap -m-4">
                                    <MyList />
                                </div>
                            </div>
                        </section>
                }
           
        </>
    );
}