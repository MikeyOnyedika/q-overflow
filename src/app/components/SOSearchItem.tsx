import Link from "next/link"
export function SOSearchItem({ soPost }){
return (
        <li role="button" className="flex">
            <Link href={soPost.url} className="flex w-full flex-col gap-3 bg-fuchsia-50 rounded-md border-w border-2 border-fuchsia-100 p-2 hover:bg-fuchsia-100 hover:border-fuchsia-300 transition duration-200">
                <h2 className="font-medium text-fuchsia-950 text-3xl">Centering a Div</h2>
                <p className="text-fuchsia-950 line-clamp-1">The act of centering a div is central to the art of css The act of centering a div is central to the art of css</p>
            </Link>
        </li>
)
}