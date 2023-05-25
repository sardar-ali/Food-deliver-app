import pizza from "../apis/pizza";
import data from "../constant"


import { ERROR, FETCH_PIZZAS, FETCH_PIZZAS_SUCCESS, SEARCH_SUCCESS, SERACH_ERROR, SHEARCH_REQ, SHOW_SIDEBAR } from "./types"

export const fetchPizzas = (category) => async dispatch => {
  dispatch({ type: FETCH_PIZZAS, payload: [] })
  try {
    // const {data} = await pizza.get(`/api/products?category=${category}`);
    const res = data.filter((itm) => itm.category.toLowerCase().includes(category.toLowerCase()));
    dispatch({ type: FETCH_PIZZAS_SUCCESS, payload: res })
  }
  catch (e) {
    dispatch({ type: ERROR, payload: 'Opps!,something went wrong' })
  }


}




export const searchProducts = (name) => async dispatch => {
  dispatch({ type: SHEARCH_REQ })
  try {
    const { data } = await pizza.get(`/api/products/search?name=${name}`)
    dispatch({ type: SEARCH_SUCCESS, payload: data })
  }
  catch (error) {
    dispatch({ type: SERACH_ERROR, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
  }
}

export const showSideBar = (boolean) => {
  return { type: SHOW_SIDEBAR, payload: boolean }
}