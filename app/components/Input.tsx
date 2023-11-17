'use client';

import { format } from "path";
import { Field, FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BiDollar } from "react-icons/bi";


interface InputProps {
    label: string;
    id: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors?: any

}

const Input:React.FC<InputProps>= ({
    label,
    id,
    type,
    disabled,
    formatPrice,
    required,
    register,
    errors

})=> {
    return (
        <div className="w-full relative">
            {formatPrice && (
                <BiDollar size={24} 
                    className="absolute left-2 top-5 text-neutral-700"
                />  
            )}

            <input id={id} disabled={disabled}
                {...register(id,{required})}
                // aria-invalid={errors[id] ? 'true' : 'false'}
                placeholder=" "
                type={type}
                className={`
                    peer p-4 pt-6 font-light bg-white w-full border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
                    ${formatPrice ? 'pl-9' : 'pl-4'}
                    ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}

                `}
              />
              <label className={`
                absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
                ${formatPrice ? 'left-9' : 'left-4'}
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
                ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}

              `}>
                {label}
              </label>
        </div>
    );
}

export default Input;