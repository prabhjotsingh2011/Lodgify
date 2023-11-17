
'use client'
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc';
import { signIn } from "next-auth/react";
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
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";


function Login() {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const onSubmit: SubmitHandler<FieldValues> =  (data) => {
        setLoading(true);
        console.log("data", data);
        try {
            signIn('credentials', {
                ...data,
                redirect:false
                 
            })
            .then((callback) => {
               if(callback?.ok){
                toast.success("Logged in successfully");
                router.refresh();
                loginModal.onClose();
               }
               if(callback?.error){
                   toast.error(callback?.error);
               }
            })
            .catch((err) => {
                console.log(err);
                toast.error(`"Something went wrong "${err}`)
            })
        } catch (error) {
            toast.error(`"Something went wrong "${error}`)
        }
        
    };

    const toggle=useCallback(()=>{
        loginModal.onClose();
        registerModal.onOpen();
    },[loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome Back to Airbnb"
                subtitle="Log In to continue"

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
                    <div>First time using Airbnb?</div>
                    <div
                        onClick={toggle} 
                    className="text-neutral-800 cursor-pointer hover:underline">
                        Create an account
                    </div>
                </div>
            </div>

        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Log In"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmt={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default Login;