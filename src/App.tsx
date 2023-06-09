import { useEffect, useState } from "react"
import AddTodo from "./components/AddTodo";
import TodoCard from "./components/TodoCard";
import { createContext } from 'react';


export interface Todo {
  _id: string;
  title: string;
  status: boolean;
}
interface ContextIF {
  setData?: (data: Todo[]) => void;
}
export const MyContext = createContext<ContextIF>({});
function App() {

  const [data, setData] = useState<Todo[]>();

  useEffect(() => {
    fetch("https://todo-backend.cyclic.app/get-todo")
      .then(response => response.json())
      .then(data => {
        setData(data.todos);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <MyContext.Provider value={{ setData }}>
      <main className="max-w-4xl mx-auto px-5">
        <AddTodo />
        <div className="grid grid-cols-2 gap-4 mt-12">
          {data?.map((item: Todo, index: number) => (<TodoCard key={index} item={item} />))}
        </div>
      </main>
    </MyContext.Provider>
  )
}

export default App