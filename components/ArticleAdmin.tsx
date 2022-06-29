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
      <div className="main-right-side">
        <h1> Articles </h1>
        <div className="products-section">
          <div className="products-box">
            {Object.values(articles).map((article, id) => (
                <Card style={{marginRight: "5%"}} key={article._id}>
                      <div className="products-pos">
                            <a className="products-a" href={"/"}>
                              <img className="restaurant-img" src={"/" + article.picture}></img>
                              <div className="products-info" style={{height: "auto", paddingLeft: "10px"}}>
                                  <h3 className="product-title">{article.name}</h3>
                                  <span className="product-subtitle">{article.price + "€"}</span>
                                  <span className="product-subtitle">Description : {article.description} <br/> Catégorie : {article.category}</span>
                              </div>
                            </a>
                      </div>
                  <ArticleModal {...article}/>
                </Card>
              ))}
          </div>
        </div>
        <ArticleModal {...nullArticle}/>
      </div>
    )
  }

export default articleAdmin;
  