import { useState } from 'react';
import './App.css';
import AddTodo from './components/add-todo';
import TodoList from './components/todo-list';
import { List } from 'types/prop-types';

import bgImage from "assets/workshop-2Kqhw3qST0o-unsplash.jpg"

function App() {
  const [list, setList] = useState<List[]>([]);
  const [listItem, setListItem] = useState<List>();

  const addToDo = (title: string, desc: string) => {
    setList(prevItems => {
      const existingIndex = prevItems.findIndex(item => (item.title).toLowerCase() === title.toLowerCase());
      if (existingIndex !== -1) {
        return prevItems;
      } else {
        return [...prevItems, { id: `${list.length + 1}`, title, desc, done: false }];
      }
    })
  }
  const updateToDo = (id: string, title: string, desc: string) => {
    setList(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          item.title = title;
          item.desc = desc;
        }
        return item
      })
    )
  }

  const setUpdate = (id: string) => {
    setListItem(list.find(l => l.id === id));
  }

  const updateListItem = (field: string, value: string) => {
    setListItem(prev => {
      if (!prev) return undefined;
      return { ...prev, [field]: value };
    });
  }
  const resetListItem = () => setListItem(undefined)

  const markAs = (id: string, done: boolean) => {
    setList(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          item.done = !done
        }
        return item
      })
    )
  }

  return (
    <div className="App">
      <div className="bg-cover bg-center bg-no-repeat min-h-dvh place-content-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="container m-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 p-6 items-center">
          <AddTodo
            addToDo={addToDo}
            updateToDo={updateToDo}
            listItem={listItem}
            updateListItem={updateListItem}
            resetListItem={resetListItem}
          />

          <TodoList
            items={list}
            setUpdate={setUpdate}
            markAs={markAs}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
