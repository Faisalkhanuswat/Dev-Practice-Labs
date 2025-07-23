import { SetStateAction } from "react";

export type ListProps = {
    items: { id: string, title: string, desc: string, done: boolean }[];
    setUpdate: (id: string) => void;
    markAs: (id: string, done: boolean) => void;
}
export type ItemProps = {
    item: { id: string, title: string, desc: string, done: boolean }
    setUpdate: (id: string) => void;
    markAs: (id: string, done: boolean) => void;
}
export type AddToDoProps = {
    addToDo: (title: string, desc: string) => void;
    updateToDo: (id: string, title: string, desc: string) => void;
    listItem?: { id: string, title: string, desc: string }
    updateListItem?: (field: string, value: string) => void;
    resetListItem?: () => void;
}
export type List = {
    id: string,
    title: string,
    desc: string,
    done: boolean
}

export type FormErrors = {
    title?: string,
    desc?: string
}


