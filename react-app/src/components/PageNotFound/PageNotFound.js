import React from "react"
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import './PageNotFound.css'

const PageNotFound = () => {
    const history = useHistory();

    useEffect(() => {
    setTimeout(() => {
        history.push('/')
        }, 4000)
    }, [history])


    return (
        <div className="page_container">
            <div className="message_container">
                <h2>404: Page not Found</h2>
                <h3>You will be redirected home shortly.</h3>
            </div>
        </div>
    )
}

export default PageNotFound
