import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
type AddItemFormPropsType = {
    addItem: (title:string) => void
}

const AddItemForm : FC<AddItemFormPropsType> = (props) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addItem()
        }
    }
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    return (

            <div className={'addItemForm'}>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyUp={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addItem}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>

    );
};

export default AddItemForm;