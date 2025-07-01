
// "use client"

// import { toggleTodo } from "./helper"



// // {complete.toString()} boolean require to convert to string in order to display on the screen.
// type toggleProps ={
//     id:string
//     title:string
//     complete:boolean
//     // toggleTodo:(id:string,complete:boolean) => void
// }

// export default function Toggle({id,title,complete}:toggleProps){
//     return(
//         <ul className="flex items-center gap-2">
//             <input defaultChecked={complete} type="checkbox" className="" onChange={e => toggleTodo(id,e.target.checked)} />
//             <div className="">{title}</div>
//         </ul>
//     )

// }