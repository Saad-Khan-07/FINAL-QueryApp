import React, { useState } from "react";

export default function Login({ allowDashboard }) {
    const [userval, setUserval] = useState("");
    const [passval, setPassval] = useState("");

    const handlelogin = async (event) => {
        event.preventDefault();
        
        const loginData = {
            username: userval,  // assuming the backend expects 'username' instead of 'email'
            password: passval,
        };

        try {
            const response = await fetch('http://localhost:8000/gettoken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                localStorage.setItem('token', data.token); // store token in local storage
                localStorage.setItem('userid',data.user_id);
                localStorage.setItem('username',data.username);
                localStorage.setItem('firstname',data.firstname);
                localStorage.setItem('lastname',data.lastname);
                localStorage.setItem('email',data.email)

                allowDashboard();  // redirect to dashboard or whatever your post-login logic is
            } else {
                console.error('Login failed');
                // handle login failure (e.g., show an error message)
            }
        } catch (error) {
            console.error('Error:', error);
            // handle error (e.g., show an error message)
        }
    };

    const storeuser = (event) => {
        setUserval(event.target.value);
    };

    const storepass = (event) => {
        setPassval(event.target.value);
    };

    return (
        <div className="mainlogin">
            <div className="Logincontent">
                <div className="Logincontainer">
                    <h2>Login</h2>
                    <form onSubmit={handlelogin}>
                        <label htmlFor="email">Username:</label>
                        <input
                            type='text'
                            id="email"
                            name="email"
                            value={userval}
                            onChange={storeuser}
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={passval}
                            onChange={storepass}
                        />

                        <button type="submit">Login</button>
                    </form>

                    <div className="signup">
                        <p>First time here?</p>
                        <a href="/">Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
