import axios from "axios"
import { baseUrl } from "./Api";
import Cookies from "universal-cookie";

const  cooki = new Cookies() ;
const idToken = cooki.get('e-commerce')


export const Axios = axios.create({
    baseURL : baseUrl,
    headers :{
        Authorization:`Bearer ${idToken}`,
    }

});
