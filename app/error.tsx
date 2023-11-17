'use client'

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface ErrorStateProps{
    error:Error;
}

const ErrorState:React.FC<ErrorStateProps>=({error})=>{
    useEffect(()=>{
        console.error(error)
    },[error])
    return (
       <EmptyState 
            title="Uhh ohh, something went wrong"
            subtitle="We're having trouble loading this page. Try refreshing the page or going back to the previous page."
       />
    )
}

export default ErrorState