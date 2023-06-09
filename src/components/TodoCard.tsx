import React, { useContext } from "react";
import { MyContext, Todo } from "../App";

interface TodoCardProps {
  item: Todo;
  newData?: (data: Todo[]) => void;
}

const TodoCard = ({ item }: TodoCardProps) => {
  const { setData } = useContext(MyContext)

  const updateStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked;
    fetch(`https://todo-backend.cyclic.app/update/${item._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: status })
    })
      .then(() => {
        updateData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    fetch(`https://todo-backend.cyclic.app/delete/${item._id}`, {
      method: 'DELETE'
    })
      .then(() => {
        updateData();
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const updateData = () => {
    fetch('https://todo-backend.cyclic.app/get-todo')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        if (typeof setData === "function") {
          setData(data.todos)
        }
      })
      .catch(error => {
        console.error('There was a problem fetching data:', error);
      });
  };

  return (
    <div className="px-4 py-6 rounded-md bg-white shadow-md">
      <div className="flex gap-3 justify-between items-center">
        <h5 className={`${item.status && "line-through text-gray-400"}`}>{item.title}</h5>
        <input type="checkbox" checked={item.status} onChange={updateStatus} className="cursor-pointer" />
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 rounded-md px-3 py-2 text-xs text-white"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TodoCard
