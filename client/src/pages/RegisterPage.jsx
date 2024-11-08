import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate() 

    async function registerUser(e){
        e.preventDefault();
        try{
            await axios.post('/register', {
                name,
                email,
                password,
            });
            navigate('/login');
            alertify.notify('Registration successful. now you can login.', 'custom', 2, function(){console.log('dismissed');});
        } catch(e){
            alert('Registration failed');
        }
    }

    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
                <h1 className="text-4xl text-center mt-8 mb-12">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text" 
                        placeholder="Yasser Elkhattab" 
                        value={name} 
                        onChange={e => setName(e.target.value)} />

                    <input type="email" 
                        placeholder="your@email.com" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} />

                    <input type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} />

                    <button className="primary mt-4">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}