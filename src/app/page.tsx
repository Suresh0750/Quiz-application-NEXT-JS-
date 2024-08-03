'use client'
import Button from "@/components/Button";
import DropDownOpens from "@/components/DropDownOpens"
import useQuiz,{configType} from "./store";

export default function Home() {

  const quizConfig = useQuiz((state:any)=>state.config)
  const addNumber = useQuiz((state:any)=>state.addNumberOfQuestions)

  console.log(quizConfig)

  return (
    <section className="flex flex-col justify-center items-center my-10">
       <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome to quiz</h1>
      <section className="p-10 my-10 rounded-lg shadow-xl w-[75%]">
        <div>
          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of questions</label>
          <input type="number" defaultValue={10} min={0} max={50} id="first_name" onChange={(e)=>addNumber(e.target.value)} className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a Number" required/>
          {/* <input type="text" /> */}
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <DropDownOpens />
          <Button />
        </div>
      </section>
    </section>
  );
}
