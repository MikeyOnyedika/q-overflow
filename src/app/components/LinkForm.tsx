export function LinkForm(){
return(
        <div className="sticky top-2 w-full flex items-center gap-3 px-4 py-2 border-2 border-fuchsia-200 bg-fuchsia-100 rounded-2xl ">
            <input placeholder="Search or Create post" className="text-lg text-gray-800 outline-none w-full bg-transparent " />
            <button className="whitespace-nowrap bg-fuchsia-600 rounded-full px-4 py-2 text-fuchsia-50 shadow-md">New Post</button>
        </div>
)

}