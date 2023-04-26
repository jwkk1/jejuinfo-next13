import List from "@/components/itemList/list";
import Category from "@/components/search/category";

export default function SearchList() {
    return (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-10">
              <div className="w-full mb-1 lg:mb-0">
                <h1 className="text-2xl mb-4 text-gray-900">여행지 검색</h1>
                <div className="h-1 w-20 bg-indigo-500 rounded"></div>
              </div>
            </div>
            <Category />
            <div className="flex flex-wrap -m-4">
                <List />
            </div>
          </div>
        </section>
    );
}