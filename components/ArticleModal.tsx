import React, {useEffect, useState} from "react";
import { NextPage } from "next"
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import axios from "axios";

export interface Article {
    _id: string,
    category: string,
    name: string,
    description: string,
    price: number,
    picture: string,
  }

const ArticleModal : NextPage<Article> = (article) => {
    const [newArticle, setArticle] = useState<Article>(null);
    const [open, setOpen] = useState(false);

    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoiYW50aG8iLCJwZXJtaXNzaW9uIjoiMSIsImlhdCI6MTY1NjUwNDA5MCwiZXhwIjoxNjU2NTExMjkwfQ.HpQ7FGO_e1k7SXlym8fj60dGktgTClgi_CTC-tmz6EojPt4sykhmoxJqci0Tr2gxaM597nWLVnueTsz2FFKgCV72gSOmEH5pYluH7RbcYsI9idCJCHgnTTDtKwbLnUzyZP4XdH175wkR93NuBXsiOVJ46OG9KxUywwQ91bgWOY8";
    useEffect(() => {
        setArticle(article);
    }
    , []);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let postArticle: Article = {
            _id: newArticle._id,
            category: "",
            name: data.get('name'),
            description: data.get('description'),
            price: data.get('price'),
            picture: newArticle.picture,
        }
        setArticle(postArticle)
        if(article._id.length > 0) {


            axios({method: 'put', url:`http://25.17.90.197:4000/api/v1/articles/update/${postArticle._id}`, headers: {'Authorization': 'Bearer ' + token}, data: postArticle})
            
            var instance = axios.create({
                baseUrl: `http://25.17.90.197:4000/api/v1/articles/update/${postArticle._id}`,
                headers: {'Authorization': 'Bearer ' + token}
            });
            instance.put('/', postArticle)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            axios.post(
                "http://25.17.90.197:4000/api/v1/articles/update/",
                postArticle,
                {
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoiYW50aG8iLCJwZXJtaXNzaW9uIjoiMSIsImlhdCI6MTY1NjQ5NDM2NiwiZXhwIjoxNjU2NTAxNTY2fQ.kf6hKYFEpeMdMbW9Snst0K5P3Agdgi_nn1K_aLU9nCAU-x5U213uHlR73dA_VGAYFf0XYylY5UVfiApBFGcU7gcDJ2KlT-_BHRDk54KAYE5kMN11fR3VJy_vUpwN7zRcN7oPVAiq_xQN2iGb9Xv1BgcqEwpnVjzBZHJZtH6AfKM",
                        "Access-Control-Allow-Origin": "*"
                    },                    
                }
            )
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })};
        }
      const onChangeImage = (e: any) => {
        if (e.target.files[0] !== null){
    
            let formData = new FormData();
            formData.append('recfile', e.target.files[0]);
            axios.post(
                "http://25.17.90.197:4000/api/v1/cdn/upload",
                formData,
                {
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoiYW50aG8iLCJwZXJtaXNzaW9uIjoiMSIsImlhdCI6MTY1NjQ5NDM2NiwiZXhwIjoxNjU2NTAxNTY2fQ.kf6hKYFEpeMdMbW9Snst0K5P3Agdgi_nn1K_aLU9nCAU-x5U213uHlR73dA_VGAYFf0XYylY5UVfiApBFGcU7gcDJ2KlT-_BHRDk54KAYE5kMN11fR3VJy_vUpwN7zRcN7oPVAiq_xQN2iGb9Xv1BgcqEwpnVjzBZHJZtH6AfKM",
                        withCredentials: true
                    },                    
                }
            )
            .then(res => {
                console.log(res.data);
                setArticle({
                    ...newArticle,
                    picture: res.data.file,
                })
            })
            .catch(err => {
                console.log(err);
            })
        }
      }

    return (
        <>
            <button className="navbar-menu-sign_up" style={{width: "-webkit-fill-available", margin: "0", marginTop: "15px"}} onClick={handleClickOpen}>
                {article._id.length > 0 ? "Modifier l'article" : "Ajouter un article"}
            </button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Modifier {article.name}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Modifiez les champs ci-dessous pour modifier l'article.
            </DialogContentText>
            <Box component="form" noValidate onSubmit={handleSubmit}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="name"
                    label="Name"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="description"
                    id="description"
                    label="Description"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="price"
                    name="price"
                    label="Price"
                    fullWidth
                    variant="standard"
                />
                <input type="file" accept="image/*" onChange={onChangeImage} />
                <Button type="submit" color="primary">
                    Modifier
                </Button>
            </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Annuler
            </Button>
            </DialogActions>
            </Dialog>
        </>
    )
}

export default ArticleModal;