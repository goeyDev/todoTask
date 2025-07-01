import Link from "next/link";

export default function Navbar(){
return(
    <nav className="max-w-5xl w-full mx-auto flex justify-between items-center border-b-2 p-4 text-lg font-semibold selection:text-blue-600 ">
        <Link href="/" className="transition-colors duration-500 transform hover:text-blue-500 hover:scale-110">Home</Link>
        <Link href="/query" className="transition-colors duration-500 transform hover:text-blue-500 hover:scale-110">Query</Link>
        <Link href="/about" className="transition-colors duration-500 transform hover:text-blue-500 hover:scale-110">About</Link>
    </nav>
)    
}