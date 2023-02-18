import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";
type EditableSpanPropsType = {
    title:string
    changeTitle: (title: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.title)
    const onEditMode = () =>setEditMode(true)
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }

  const  onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{setTitle(e.currentTarget.value)}
    return (
        editMode
            ? <TextField
            variant={"standard"}
                value={title}
                onBlur={offEditMode}
            autoFocus
                onChange={onChangeHandler}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditableSpan;