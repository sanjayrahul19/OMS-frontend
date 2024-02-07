'use client'

import React from 'react';
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "@/validations/login-validation";
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { post } from '@/service/api';
import useLocalStorage from '@/hooks/useLocalStorage';


interface DataParams {
    email: string,
    password: string
}

const HrLogin = () => {
    const [, setStoredValue] = useLocalStorage('sessionToken');
    

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: DataParams) => {
        try {
            const response = await post(`/hr/login`, data)
            console.log(response)
            setStoredValue(response?.session?.session_token)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-lg text-center">
                    <Image
                        className="mb-4"
                        src="https://www.sparkouttech.com/assets/images/logo/sparkout-logo.svg"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                        priority={true}
                        style={{ width: "100%", height: "auto" }}
                    />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-md text-gray-700">
                            Email
                        </label>
                        <div className="mt-1 relative">
                            <input type="" id="email" className={`block rounded-lg w-full p-3 sm:text-sm focus:outline-none border  ${errors.email?.message ? 'border-red-500 text-red-500 ' : 'border-gray-300'}`} placeholder="you@example.com" aria-describedby="email-description" {...register("email")} />
                            {errors.email?.message && (
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                </div>
                            )}
                        </div>
                        {errors.email?.message && <p className="mt-2 text-sm text-red-600" id="email-error">{errors.email?.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-md font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <input type="password" id="password" className={`block rounded-lg w-full p-3 sm:text-sm  focus:outline-none border ${errors.password?.message ? 'border-red-500 text-red-500 ' : 'border-gray-300'}`} aria-describedby="password-description" {...register("password")}
                            />
                            {errors.password?.message && (
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                </div>
                            )}
                        </div>
                        {errors.password?.message && <p className="mt-2 text-sm text-red-600">{errors.password?.message}</p>}
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default HrLogin