import React, { createContext, useContext } from "react";
import Cookies from "universal-cookie";
import { ENV } from "../ENV";
import axios from "axios";
const cookies = new Cookies();
const CScontext = createContext();
const URI = ENV.URI
const useCS = () => {
    return useContext(CScontext);
}

const CSprovider = ({ children }) => {
    const getData = async () => {
        try {
            const data = {
                aid: cookies.get('csadmintokenid'),
                fullname: cookies.get('csadmintokenname')
            }
            return data;
        } catch (err) {
            console.error(err);
        }
    }

    const setAdminData = async (data) => {
        try {
            cookies.set('csadmintokenid', data.token , {  maxAge: 24 * 60 * 60 });
            cookies.set('csadmintokenname', data.fullname, { maxAge: 24 * 60 * 60 });
            return 'success';
        } catch (err) {
            console.error(err);
        }
    }

    const signOut = async () => {
        try {
            cookies.set('csadmintokenid', '',  {  maxAge: -1 });
            cookies.set('csadmintokenname','',  { maxAge: -1});
            return 'success';
        } catch (err) {
            console.error(err);
        }
    }
    const signIn = async (data) =>{
       try{
        const res = axios.post(`${URI}/api/admin/signin`, data);
        return (await res).data
       }catch(err){
        console.error(err)
       }
    }
    const getPosts = async () => {
        try{
            const res = axios.get(`${URI}/api/admin/getposts`);
            return (await res).data
           }catch(err){
            console.error(err)
           }
    }
    const getUserPosts = async () => {
        try{
            const res = axios.get(`${URI}/api/user/getposts`);
            return (await res).data
           }catch(err){
            console.error(err)
           }
    }
    const addPost = async (data) => {
        try{
            const res = axios.post(`${URI}/api/admin/addpost`, data);
            return (await res).data
           }catch(err){
            console.error(err)
           }
    }
    const updatePost = async (data) => {
        try{
            const res = axios.post(`${URI}/api/admin/updatepost`, data);
            return (await res).data
           }catch(err){
            console.error(err)
           }
    }
    const toggleActive = async (data) => {
        try{
            const res = axios.post(`${URI}/api/admin/toggleactive`, data);
            return (await res).data
           }catch(err){
            console.error(err)
           }
    }
    const deletePost = async (data) => {
        try{
            const res = axios.post(`${URI}/api/admin/deletepost`, data);
            return (await res).data
           }catch(err){
            console.error(err)
           }
    }
    const updateView = async (data) => {
        try{
            const res = axios.post(`${URI}/api/user/updateview`, data);
            return (await res).data
           }catch(err){
            console.error(err)
           }
    }
    return (
        <CScontext.Provider value={{updateView,getUserPosts,updatePost,deletePost,toggleActive,addPost,getPosts,signIn, signOut, getData, setAdminData }}>
            {children}
        </CScontext.Provider>
    )
}

export { CSprovider, useCS };
