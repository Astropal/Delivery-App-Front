import React, {useState} from "react";
import { NextPage } from "next"
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import axios from "axios";
import ArticleModal from "@components/ArticleModal"

export interface Article {
  _id: string,
  category: string,
  name: string,
  description: string,
  price: number,
  picture: string,
}
export interface Menu {
  articles: Array<Article>,
  total: string
}

const articleAdmin : NextPage<Article[]> = (articles) => {
  const nullArticle: Article = {
    _id: "",
    category: "",
    name: "",
    description: "",
    price: 0,
    picture: "",
  }
    return (
      <>
        <h1> Articles </h1>
        <div>
          {Object.values(articles).map((article, id) => (
              <Card key={article._id}>
                <h1> Nom {article.name} </h1>
                <p> Catégorie {article.category} </p>
                <p> Description {article.description} </p>
                <p> Prix {article.price} </p>
                <p> Image {article.picture} </p>
                <ArticleModal {...article}/>
              </Card>
            ))} 
            <ArticleModal {...nullArticle}/>
        </div>
      </>
    )
  }

export default articleAdmin;
  