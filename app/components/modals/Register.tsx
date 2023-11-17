
'use client'
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm,

} from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";


function Register() {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> =  (data) => {
        setLoading(true);
        

        try {
            
             axios.post('/api/register', data)
                .then((res) => {
                    registerModal.onClose();
                    loginModal.onOpen();
                    toast.success("Account created successfully Please login");  
                    
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(`"Something went wrong "${err}`)
                })

        } catch (error) { 
            console.log(error);
            toast.error(`"Something went wrong "${error}`)
        } finally {
            setLoading(false);
        }
    };

    const toggle=useCallback(()=>{
        registerModal.onClose();
        loginModal.onOpen();
    },[loginModal, registerModal])


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome to Airbnb"
                subtitle="Sign up to continue"

            />
            <Input 
                id="email"
                label="Email Address"
                disabled={isLoading}
                errors={errors}
                register={register}
                required
            />
            <Input 
                id="name"
                label="Name"
                disabled={isLoading}
                errors={errors}
                register={register}
                required
            />
            <Input 
                id="password"
                label="Password"
                disabled={isLoading}
                errors={errors}
                register={register}
                required
            />
        </div>

    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3 ">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
             <Button
                outline
                label="Continue with GitHub"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
             <Button
                outline
                label="Continue with LinkedIn"
                icon={AiFillLinkedin}
                onClick={() => {}}
            />

            <div className="text-neutral-500 text-center mt-4 font-light justify-center">
                <div className="flex flex-row items-center gap-2 justify-center">
                    <div>Already have an account?</div>
                    <div
                        onClick={toggle} 
                    className="text-neutral-800 cursor-pointer hover:underline">
                        Log in
                    </div>
                </div>
            </div>

        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmt={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default Register;