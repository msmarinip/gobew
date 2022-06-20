import React, { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { CREATION_USER_LOGIN } from "../../redux/actions"

export default function LogInGoogle() {
    const navegar = useNavigate()
    const [user, setuser] = useState({})
    const dispatch = useDispatch()

    function handleCalBackResponse(response) {
        const userObject = jwt_decode(response.credential)
        setuser(userObject);
        if (userObject) {
            const info = {
                userEmail: userObject.email,
                userIsActive: userObject.email_verified,
                userIsGoogle: true,
                userFirstName: userObject.given_name,
                userLastName: userObject.family_name,
                userImage: userObject.picture,
            }
            dispatch(CREATION_USER_LOGIN(info));
        }
    }

    useEffect(() => {
        /* global google */
        if (window.google) {
            google.accounts.id.initialize({
                client_id: "730053348546-b9gt1dk3ja161r1ndcjrc2v8gkfoalfi.apps.googleusercontent.com",
                callback: handleCalBackResponse
            })
            google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                { theme: "outline", size: "large" }
                )
            }
            }, []);
            
    return (
        <div className="googleForm">
            <div id="signInDiv" className="googleForm--signIn"></div>
            {user.email_verified === true && navegar("/") }
        </div>
    )
}