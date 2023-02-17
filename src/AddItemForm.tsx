import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {ButtonGroup, IconButton, TextField} from "@mui/material";
import {DeleteForever, LibraryAdd} from "@mui/icons-material";
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

                <TextField value={title}
                       onChange={onChangeHandler}
                       onKeyUp={onKeyPressHandler}
                       className={error ? "error" : ""}
                           variant={'outlined'}
                           size={"small"}
                           label={'Enter title'}
                           error={!!error}
                           helperText = {error && 'Ошибка'}
                />

                <IconButton aria-label="delete" onClick={addItem} color = 'success' size = 'small'>
                    <LibraryAdd    />
                </IconButton>
 
            </div>

    );
};

export default AddItemForm;