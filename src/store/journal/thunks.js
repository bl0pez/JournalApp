import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseBD } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNotById } from "./";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: "",
            body: "",
            imageUrls: [],
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(firebaseBD, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const notas = await loadNotes(uid);

        dispatch(setNotes(notas));
    }
}

export const startSavingNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFirestore = { ...note };
        //Elimina la propiedad id de la nota para que no se guarde en firestore
        delete noteToFirestore.id;

    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const docRef = doc(firebaseBD, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFirestore, { marge: true });

        dispatch(updateNote(note));

    }
}

export const startUploading = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());

        const fileUploadPromise = [];

        for (const file of files) {
            fileUploadPromise.push(fileUpload(file));
        }

        const photosUrls = await Promise.all(fileUploadPromise);

        dispatch(setPhotosToActiveNote(photosUrls));

    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(firebaseBD, `${uid}/journal/notes/${note.id}`);

        await deleteDoc(docRef);

        dispatch(deleteNotById(note.id));
    }
}