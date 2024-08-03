
"use client"
import { useEffect, useState } from "react"
import useQuiz from "../store"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton" // for show the shadow before the contant show our page
import { Player } from "@lottiefiles/react-lottie-player"
import { useRouter } from "next/navigation"

type result = [{
    [index:string] :any
}]
type obj = {
    [index:string] :any
}
export default function quiz(){
   const [questions, setQuestions] = useState<result[]>([])
    const [answer,setAsnwer] = useState('')
    const [loading,setLoading] = useState(false )
    const config = useQuiz((state:any)=>state.config)
    const setScore = useQuiz((state:any)=>state.addScore)
    console.log(config)

    // * back to the home page
    const backToQiz = ()=>{
        console.log('reach first')

        console.log('reach')
        const router = useRouter()
        
        router.push('/')
    }


    let c =0 
    useEffect(()=>{
        async function getQuestions(){
            setLoading(true)
            if(c==0){
                c++
            console.log(`https://opentdb.com/api.php?amount=${config.numberOfQuestion}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}`)
            const data : {results:result[]} = await(await fetch(`https://opentdb.com/api.php?amount=${config.numberOfQuestion}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}`)).json()
            const {results } : {results:result[]} = data ?? []
            
            if(results?.length){
                
                            let shuffledResults : any [] = results.map((e:any)=>{
                                let value = [...e.incorrect_answers, e.correct_answer].map((value)=>({value,sort: Math.random()})).sort((a,b)=>a.sort-b.sort).map(({value})=>value);
                                e.answers  = [...value]
                                return e
                            })
                            console.log(`suffledRes\n`,shuffledResults)
                            
                            setQuestions([...shuffledResults])
                            setLoading(false)
            }
            
            }
        }   
        getQuestions()
    },[config.category.id,config.level,config.type,config.numberOfQuestion])

    const handleNext = ()=>{
        let remainingQuestions : result[] = [...questions]
        console.log(`remaining`,remainingQuestions)
        remainingQuestions.shift()
        setQuestions([...remainingQuestions])
        setAsnwer('')
    }

    const checkAnswer = (ans:string)=>{
        console.log(ans)
        if(ans===questions[0]?.correct_answer){
            setScore()
        }
        setAsnwer(questions[0]?.correct_answer)
    }

    console.log('questions \n',questions)
    return(
        <section className="flex flex-col justify-center items-center mt-10">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Question Number <span className="text-blue-600 dark:text-blue-500"> {questions.length ? `# ${config.numberOfQuestion-questions.length+1}`:''}</span></h1>

            {
                !loading && !questions.length && <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Score : { config.score}</h1>
            }
            {
                !questions.length && !loading && <div className="flex flex-col justify-center items-center"> <Player src='https://assets1.lottiefiles.com/packages/lf20_myejiggj.json' className="player" loop autoplay style={{height:'400px', width:'400px'}}/></div>
            }
            
            <section className="shadow-2xl my-10 p-10 w-[90%] rounded-lg flex flex-col justify-center items-center shadow-blue-200">
                <h4 className="mb-4 text-3 xl font-extrabold leading-none text-center tracking-tight text-blue-600  dark:text-blue-500 md:text-3xl lg:text-5 xl "><span className="text-blue-600 dark:text-blue-500">{questions[0]?.question}</span></h4>
                {
                    loading && <div className="flex flex-col"> 
                        <Skeleton className="w-[600px] h-[60px] my-10 rounded-sm" />
                        <Skeleton className="w-[600px] h-[500px] rounded-sm" />

                         </div>
                }
                <div className="flex justify-evenly items-center my-20 flex-wrap w-[90%]">
                    {
                        questions[0]?.answers?.map((option:(string))=>(<button type="button" key={option} onClick={()=>checkAnswer(option)} className={cn("w-[33%] cursor-pointer my-4 py-3.5 px-5 me-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border-0 shadow-blue-200 shadow-2xl  hover:bg-blue-700 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",{
                            "bg-red-600" : answer && option!==answer,
                            "bg-blue-600" : answer && option==answer,
                            "hover:bg-red-600" : answer && option!==answer,
                            "hover:bg-blue-600" : answer && option==answer,
                            "text-gray-100" : answer
                        })}>{option}</button>))
                    }

                </div>
                {
                    questions.length ?
                    <button type="button" onClick={()=>handleNext()} className="w-[33%] my-4 py-3.5 px-5 me-2 mb-2 text-sm cursor-pointer font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-900 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Next</button> :
                    <button type="button" onClick={()=>window.location.reload()} className="w-[33%] my-4 py-3.5 px-5 me-2 mb-2 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-900 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Take Another quiz</button>
                }
            </section>  
        </section>
    )    } 