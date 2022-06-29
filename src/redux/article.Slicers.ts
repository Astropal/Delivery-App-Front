
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

interface article {
  name: string;
  price: number;
  description: string;
}

export interface ArticleState {
  articles: article[]
}
/**
 * Default state object with initial values.
 */
var initialState = {
  articles: [{}],
};

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticles: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.articles> 
    ) => {
      state.articles.push(action.payload);
    },
    deleteArticles: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.articles> 
    ) => {
      state.articles = [{}];
    },
    removeFromCart: (state, action) => {
      const index = state.articles.findIndex((item) => item);
      state.articles.splice(index, 1);
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getArticleState = (state: { article: ArticleState }) => state.article;

// Exports all actions
export const {setArticles,deleteArticles,removeFromCart} = articleSlice.actions;

export default articleSlice.reducer;
