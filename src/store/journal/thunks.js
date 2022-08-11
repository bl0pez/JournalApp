import { collection, doc, setDoc } from "firebase/firestore/lite";
import { firebaseBD } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes } from "./";
import { loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async(dispatch, getState) => {

        dispatch(savingNewNote());
        
        const { uid } = getState().auth;

        const newNote = {
            title: "",
            body: "",
            createdAt: new Date().getTime(),
        }

        const newDoc = doc( collection( firebaseBD, `${uid}/journal/notes`));
        await setDoc( newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ));
        dispatch( setActiveNote( newNote ));

    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState ) => {
        const { uid } = getState().auth;

        const notas = await loadNotes( uid );

        dispatch( setNotes( notas ));
    }
}