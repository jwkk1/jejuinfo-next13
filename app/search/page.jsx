import List from "@/components/itemList/list";
import Category from "@/components/search/category";

export default function SearchList() {
    return (
        <>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">여행지 검색</h1>
                <div className="h-1 w-20 bg-indigo-500 rounded"></div>
              </div>
              {/* <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">카테고리</p> */}
            </div>
            <Category />
            <div className="flex flex-wrap -m-4">
                <List />
            </div>
          </div>
        </section>
        </>
    );
}