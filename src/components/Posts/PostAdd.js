import React from 'react'
import { useFormik, } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';

// Material
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Slide,
} from '@mui/material';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import CloseIcon from '@mui/icons-material/Close';

// Custom
import {
  useMutation
} from "@apollo/client";
import { ADD_POST } from "../../app/queries";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} timeout={{enter: 5, exit: 5,}} {...props} />;
});

const validationSchema = yup.object({
  author: yup
    .string('Enter your username')
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  title: yup
    .string('Enter your title')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: yup
    .string('Enter your description'),
  titleimage : yup
    .string('Enter your tiele imaage'),
});

const PostAdd = ({onClick, active, refetch, setPosts}) => {
  
  const [dateOfBirth, setDateOfBirth] = React.useState(new Date())
  const [open, setOpen] = React.useState(active);
  const [scroll, setScroll] = React.useState('paper');

  const [createPost, { data, loading, error }] = useMutation(ADD_POST);

  const formik = useFormik({
    initialValues: {
      "author":'',
      "title":'',
      "description":'',
      "titleimage":''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
console.log('values', values)
      //const newData = _.omit(values, 'passwordConfirmation')
      setOpen(false)
      onClick(false)
      createPost({variables:{input:values}}).then((res) => {
        setPosts(prevState => [...prevState, res.data.createPost])
        formik.resetForm()
        refetch();
      })
    },
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClick(false)
    formik.resetForm()
    
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  React.useEffect(()=>{
    setOpen(active)
  },[active])

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
      <Dialog
        fullScreen
        TransitionComponent={Transition}
        open={open}
        onClose={(_, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" sx={{padding:'0 !important'}}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add new post
            </Typography>
            <Button color="inherit" type="submit" onClick={formik.handleSubmit}>Add</Button>
          </Toolbar>
        </AppBar>{/*  */}
        </DialogTitle>
        
        <DialogContent dividers={scroll === 'paper'}>
          <div 
            id="scroll-dialog-description" 
            ref={descriptionElementRef} 
            tabIndex={-1} 
          >

          <TextField
            autoFocus
            margin="dense"
            id="author"
            name="author"
            label="Author"
            type="text"
            
            variant="standard"
            value={formik.values.author}
            onChange={formik.handleChange}
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author}
          />
          <TextField
            autoFocus
            margin="dense"
            id="titleimage"
            name="titleimage"
            label="Title image"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.titleimage}
            onChange={formik.handleChange}
            error={formik.touched.titleimage && Boolean(formik.errors.titleimage)}
            helperText={formik.touched.titleimage && formik.errors.titleimage}
          />
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Desription"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          
          {/* <MobileDatePicker
            label="Activation time"
            value={dateOfBirth}
            minDate={new Date()}
            maxDate={new Date()}
            format="yyyy/MM/dd"
            onChange={(newValue) => {
              setDateOfBirth(newValue)
              //formik.handleChange(newValue)
            }}
            renderInput={(params) => 
              <TextField 
                id="date_of_birth"
                name="date_of_birth"
                margin="dense"
                variant="standard"
                value={dateOfBirth}
                onChange={formik.handleChange}
                error={formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)}
                helperText={formik.touched.date_of_birth && formik.errors.date_of_birth}
                {...params} 
              />}
          /> */}
          
          </div>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          
        </DialogActions>
      </Dialog>
      </form>
    </div>
  )
}

export default PostAdd