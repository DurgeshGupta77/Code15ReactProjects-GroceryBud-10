import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ items, removeItem, editItem }) => {
    return <div className="list-item">
        {items.map((item) => {
            const { id, title } = item;
            return <div className="grocery-item" key={id}>
                <p className="grocery-title">{title}</p>
                <div className="btn-grp">
                    <button className="edit-btn" onClick={() => editItem(id)}>
                        <FaEdit className="icon" />
                    </button>
                    <button className="delete-btn" onClick={() => removeItem(id)}>
                        <FaTrash className="icon" />
                    </button>
                </div>
            </div>
        })}
    </div>
}

export default List;