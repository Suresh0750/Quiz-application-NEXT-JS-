
import useQuiz from "@/app/store"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { useState, useEffect } from "react"
import {ChevronDown} from 'lucide-react'

type CategoryType = {
    id:number,
    name : string
}

export default function DropOption(){

    const [category,setCategory] = useState<CategoryType[]>([])
    const addCategory = useQuiz((state:any)=>state.addCategory)
    const addLevel = useQuiz((state:any)=>state.addLevel)
    const addType = useQuiz((state:any)=>state.addType)
    const config = useQuiz((state:any)=>state.config)
    console.log('config',config)
    const Type = ['boolean','multiple']
    const Level = ['easy','medium','hard']

    useEffect(()=>{
        async function fetchCategory(){

            const data :{trivia_categories:CategoryType[]} = await (await fetch('https://opentdb.com/api_category.php')).json()
            // console.log(data)
            const {trivia_categories} :{trivia_categories:CategoryType[]} = data
            
            setCategory([...trivia_categories])
        }
        fetchCategory()
    },[])
    
    return(
        <section className="flex justify-evenly items-center py-5 w-full">
            <div className="px-7 py-4 w-1/10 mx-4">
            <DropdownMenu>
            <DropdownMenuTrigger className="flex outline-none justify-between w-full px-12 py-5 rounded-lg shadow-md hover:bg-violet-900 hover:text-black">{config.category.name ? config.category.name: 'SELECT CATEGORY'}<ChevronDown/></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Select Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    category.map((data:CategoryType)=> <DropdownMenuItem key={data.id} onClick={()=>addCategory(data.id,data.name)}>{data.name}</DropdownMenuItem>)
                }
            </DropdownMenuContent>
            </DropdownMenu>
            </div>
            <div className="px-7 py-4 w-1/10 mx-4">
            <DropdownMenu>
            <DropdownMenuTrigger className="flex outline-none justify-between w-full px-12 py-5 rounded-lg shadow-md hover:bg-violet-900 hover:text-black">{config.level ? config.level: 'SELECT LEVEL'} <ChevronDown/></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Select Level</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    Level.map((data:string,ind:number)=>  <DropdownMenuItem key={ind} onClick={()=>addLevel(data)}>{data}</DropdownMenuItem>)
                }
            </DropdownMenuContent>
            </DropdownMenu>
            </div>
            <div className="px-7 py-4 w-1/10 mx-4">
            <DropdownMenu>
            <DropdownMenuTrigger className="flex outline-none justify-between w-full px-12 py-5 rounded-lg shadow-md hover:bg-violet-900 hover:text-black">{config.type ? config.type: 'SELECT TYPE'} <ChevronDown/></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Select Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    Type.map((data:string,ind:number)=><DropdownMenuItem key={ind} onClick={()=>addType(data)}>{data}</DropdownMenuItem>)
                }
            </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </section>
    )
} 