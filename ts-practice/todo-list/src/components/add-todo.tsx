import React, { FormEvent, useState } from "react";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddToDoProps, FormErrors } from "types/prop-types";

export default function AddTodo({ addToDo, updateToDo, listItem, updateListItem, resetListItem }: AddToDoProps) {
    const [errors, setErrors] = useState<FormErrors>({});

    function handleToDo(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData as any);
        setErrors({})
        if (!data.title || !data.description) {
            if (!data.title) {
                setErrors(prev => ({ ...prev, title: 'Name is required field' }))
            }
            if (!data.description) {
                setErrors(prev => ({ ...prev, desc: 'Description is required field' }))
            }
            return
        }

        if (!data.id) {
            addToDo(data.title, data.description);
        } else {
            updateToDo(data.id, data.title, data.description);
            if (resetListItem)
                resetListItem()
        }
        e.currentTarget.reset()
    }

    return listItem ? <form onSubmit={handleToDo} className="bg-white/70 px-4 py-5 rounded-md text-purple-900">
        <h1 className="text-xl font-semibold mb-4">Add New To-Do</h1>
        <input type="hidden" name="id" value={listItem?.id} />
        <div className="mb-4">
            <label htmlFor="name" className="font-medium mb-1 block">To-Do Name</label>
            <input onChange={(e) => updateListItem?.("title", e.target.value)} type="text" value={listItem?.title} name="title" id="name" className="block w-full bg-transparent border-2 border-purple-800 rounded-md py-2 px-3 outline-0" />
            {errors.title && <small className="text-red-700 text-sm">
                <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
                {errors.title}</small>}
        </div>
        <div className="mb-4">
            <label htmlFor="desc" className="font-medium mb-1 block">To-Do Description</label>
            <textarea onChange={(e) => updateListItem?.("desc", e.target.value)} name="description" value={listItem?.desc} rows={4} id="desc" className="block w-full bg-transparent border-2 border-purple-800 rounded-md py-2 px-3 outline-0 resize-none"></textarea>
            {errors.desc && <small className="text-red-700 text-sm">
                <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
                {errors.desc}</small>}
        </div>
        <div className="mb-3 mt-7">
            <button type="submit"
                className="bg-purple-800 text-white font-semibold rounded-md px-4 py-2">
                Update To-Do
            </button>
        </div>
    </form> : <form onSubmit={handleToDo} className="bg-white/70 px-4 py-5 rounded-md text-purple-900">
        <h1 className="text-xl font-semibold mb-4">Add New To-Do</h1>
        <div className="mb-4">
            <label htmlFor="name" className="font-medium mb-1 block">To-Do Name</label>
            <input type="text" name="title" id="name" className="block w-full bg-transparent border-2 border-purple-800 rounded-md py-2 px-3 outline-0" />
            {errors.title && <small className="text-red-700 text-sm">
                <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
                {errors.title}</small>}
        </div>
        <div className="mb-4">
            <label htmlFor="desc" className="font-medium mb-1 block">To-Do Description</label>
            <textarea name="description" rows={4} id="desc" className="block w-full bg-transparent border-2 border-purple-800 rounded-md py-2 px-3 outline-0 resize-none"></textarea>
            {errors.desc && <small className="text-red-700 text-sm">
                <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
                {errors.desc}</small>}
        </div>
        <div className="mb-3 mt-7">
            <button type="submit"
                className="bg-purple-800 text-white font-semibold rounded-md px-4 py-2">
                Add To List
            </button>
        </div>
    </form>
}