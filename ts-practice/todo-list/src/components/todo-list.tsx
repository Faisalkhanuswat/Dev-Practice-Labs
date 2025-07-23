import { ListProps } from "types/prop-types";
import ListItem from "./todo-item";

export default function TodoList({ items, setUpdate, markAs }: ListProps) {
    return <div className="h-full text-white bg-purple-800/60 rounded-md backdrop-blur-sm">
        <h1 className="p-4 border-b text-xl text-center font-semibold">
            To-Do List
        </h1>
        <ul className="p-4 max-h-96 overflow-y-auto overflow-x-hidden list">
            {items.map(item => <ListItem key={item.id} item={item} setUpdate={setUpdate} markAs={markAs} />)}
        </ul>
    </div>
}