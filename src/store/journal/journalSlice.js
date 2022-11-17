import { createSlice } from "@reduxjs/toolkit";


export const journalSlice = createSlice({
    name: "journal",
    initialState: {
        isSaving: false,
        messageSaved: "",
        notes: [],
        active: null,
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            //TODO: mensaje de error
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => note.id === action.payload.id ? action.payload : note);
        },
        deleteNote: (state, action) => {

        },
    }
});

//action creators are generated for each case reducer function.
export const { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNote } = journalSlice.actions;