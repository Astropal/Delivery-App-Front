import { Card } from "@mui/material"
import { NextPage } from "next"
import { memoryUsage } from "process"
import React from "react"

interface Article {
  id: string,
  category: string,
  name: string,
  description: string,
  price: number,
  picture: string,
}

interface Menu {
  id: string,
  articles: Array<Article>,
  total: string
}

const menuAdmin: NextPage<Menu[]> = (menus) => {
  console.log(menus)
    return (
      <>
        <h1> Menus </h1>
        <div>
          {Object.values(menus).map(menu => (
              <Card key={menu.id}>
                <h1> Total : {menu.total} </h1>
                {menu.articles.map(article => (
                    <li> {article.name} </li>
                  ))}
              </Card>
            ))}
        </div>
      </>
    )
  }

  export default menuAdmin;
