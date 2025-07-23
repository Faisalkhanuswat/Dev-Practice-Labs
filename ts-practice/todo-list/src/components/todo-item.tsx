import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ItemProps } from "types/prop-types";



export default function ListItem({ item: { id, title, desc, done }, setUpdate, markAs }: ItemProps) {

    const updatehandler = (lId: string) => {
        setUpdate(lId)
    }

    return <li className="bg-white/30 px-4 py-2 rounded-md mb-2">
        <div className="text-end">
            {!done && <button
                onClick={() => updatehandler(id)}
                className="hover:text-white/80 me-2">
                <FontAwesomeIcon icon={faPen} />
            </button>}
            <button onClick={() => markAs(id, done)}
                className="hover:bg-purple-800/80 bg-purple-800 px-2 rounded-md text-sm py-1">
                {done ? "Undone" : 'Done'}
            </button>
        </div>
        <h6 className={`text-lg font-medium ${done && "line-through"}`}>
            {title}
        </h6>
        <p className={done ? 'line-through' : ''}>{desc}</p>
    </li>

}