import { useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutline, SaveOutlined, UploadFileOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { useForm } from '../../hooks/useForm';
import { ImageGallery } from '../components';
import { setActiveNote, startDeletingNote, startSaveNote, startUploading } from '../../store/journal';

export const NoteView = () => {

  const { active:note, messageSaved, isSaving } = useSelector(state => state.journal);
  const dispatch = useDispatch();

  const { body, title,  date, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const fileInputRef = useRef();

  useEffect(() => {
    if( messageSaved.length > 0 ) {
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved]);
  

  useEffect(() => {
    dispatch( setActiveNote(formState) );
  }, [formState])

  const onSaveNote = () => {
    dispatch( startSaveNote() );
  }

  const onFileInputChange = ({ target }) => {
    if( target.files === 0) return;

    dispatch(startUploading(target.files));

  }

  const onDelete = () => {
    dispatch(startDeletingNote());
  }
  

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          { dateString }
        </Typography>
      </Grid>
      <Grid item>

        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={ onFileInputChange }
          style={{ display: 'none' }}
          />

        <IconButton
          color="primary"
          disabled={ isSaving }
          sx={{ padding: 2 }}
          onClick={ () => fileInputRef.current.click() }
        >
          <UploadFileOutlined />
        </IconButton>

        <Button
          disabled={ isSaving } 
          color="primary" 
          sx={{ padding: 2 }}
          onClick={ onSaveNote }
          >
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
            Guardar
        </Button>
      </Grid>

    <Grid container>
        <TextField 
            type="text"
            variant="filled"
            fullWidth
            placeholder="Ingrese un título"
            label="Título"
            sx={{border:'none', mb: 1}}
            name="title"
            value={title}
            onChange={onInputChange}
        />

        <TextField 
            type="text"
            variant="filled"
            fullWidth
            multiline
            placeholder="¿Qué sucedió hoy?"
            minRows={5}
            name="body"
            value={body}
            onChange={onInputChange}
        />

    <Grid container justifyContent='end' sx={{mt: 1,}}>
      <Button 
        color="error"
        onClick={ onDelete }
        disabled={ isSaving }
        sx={{ display: 'flex', alignItems: 'center'}}
      >
        <DeleteOutline />
        Borrar
      </Button>
    </Grid>

    </Grid>

        <ImageGallery images={note.imageUrls}/>

    </Grid>
  );
};
