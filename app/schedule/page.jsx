import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LoginComponent from "@/components/login/logincomponent";
import ScheduleList from "@/components/schedule/scheduleList";

export default async function Schedule() {
    const user = await getServerSession(authOptions) || '';

    return(
        <>
            {
                user ==='' 
                ? <LoginComponent />
                :  <section className="text-gray-600 body-font h-full min-w-full">
                        <div className="container px-5 py-12 mx-auto">
                            <div className="flex flex-wrap w-full mb-10">
                                <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                                    <h1 className="text-2xl mb-4 text-gray-900">일정플래너</h1>
                                    <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                                </div>
                            </div>
                            <div className="flex flex-wrap -m-4">
                                <ScheduleList />
                            </div>
                        </div>
                    </section>
            }
           
        </>
    );
    
}