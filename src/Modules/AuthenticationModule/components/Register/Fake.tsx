import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/PMS 3.png";
import Styles from "./Register.module.css";

import img from "../../../..//assets/images/8550fbcbe60cd242d12760784feff287.jpeg";

interface IFormInput {
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    profileImage: FileList;
    password: string;
    confirmPassword: string;
}

export default function Register() {
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();
    let {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<IFormInput>();
    const imgValue = watch();

    const password = useRef({});
    password.current = watch("password", "");
    const appendToFormData = (data: any) => {
        const formData = new FormData();
        formData.append("userName", data.userName);
        formData.append("email", data.email);
        formData.append("country", data.country);
        formData.append("phoneNumber", data.phoneNumber);
        formData.append("profileImage", data.profileImage[0]);
        formData.append("password", data.password);
        formData.append("confirmPassword", data.confirmPassword);
        return formData;
    };
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const registerFormData = appendToFormData(data);

            const response = await axios.post(
                "https://upskilling-egypt.com:3003/api/v1/Users/Register",
                registerFormData
            );
            console.log(response);

            navigate("/verify");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className={` ${Styles.authcontainer}  `}>
                <div className="container-fluid">
                    <div className="row d-flex justify-content-center vh-100 align-items-center  ">
                        <div className="col-md-7 ">
                            <div className="text-center">
                                <img className="" src={logo} alt="" />
                            </div>
                            <div className={`  ${Styles.bgFormContainer} p-4 px-5 pt-5 `}>
                                <h6 className="text-white">welcome to PMS</h6>
                                <h2 className={`${Styles.textGold}`}>
                                    <span className="text-decoration-underline">C</span>reate New
                                    Account
                                </h2>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row py-3">
                                        <div className="text-center">
                                            <label htmlFor="file">
                                                <img
                                                    className={`${Styles.profileImg}`}
                                                    src={
                                                        imgValue?.profileImage
                                                            ? URL.createObjectURL(imgValue.profileImage[0])
                                                            : img
                                                    }
                                                    alt="profileImg"
                                                />

                                                <i
                                                    className={`${(Styles.profileIcon, Styles.textGold)
                                                        } fa fa-camera position-absolute`}
                                                ></i>
                                            </label>
                                            <input
                                                type="file"
                                                className={`${Styles.file} `}
                                                id="file"
                                                {...register("profileImage", {
                                                    required: "profileImage is required",
                                                })}
                                            />
                                        </div>
                                        {errors.profileImage && (
                                            <p className="alert alert-danger p-0">
                                                {errors.profileImage.message}
                                            </p>
                                        )}
                                        <div className="col-md-6">
                                            <label className={`${Styles.textGold}`}>Username</label>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`${Styles.input} p-1 text-white w-100`}
                                                    placeholder="Enter your name"
                                                    {...register("userName", {
                                                        required: "Username is required",
                                                    })}
                                                />
                                            </div>
                                            {errors.userName && (
                                                <p className="alert alert-danger p-0">
                                                    {errors.userName.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="col md-6">
                                            <label className={`${Styles.textGold}`}>E-mail</label>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`${Styles.input} p-1 text-white w-100`}
                                                    placeholder="Enter your email"
                                                    {...register("email", {
                                                        required: "email is required",
                                                    })}
                                                />
                                            </div>
                                            {errors.email && (
                                                <p className="alert alert-danger p-0">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <label className={`${Styles.textGold}`}>Country</label>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`${Styles.input} p-1 text-white w-100`}
                                                    placeholder="Enter your Country"
                                                    {...register("country", {
                                                        required: "country is required",
                                                    })}
                                                />
                                            </div>
                                            {errors.country && (
                                                <p className="alert alert-danger p-0">
                                                    {errors.country.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="col md-6">
                                            <label className={`${Styles.textGold}`}>
                                                Phone Number
                                            </label>
                                            <div>
                                                <input
                                                    type="number"
                                                    className={`${Styles.input} p-1 text-white w-100`}
                                                    placeholder="Enter your Phone Number"
                                                    {...register("phoneNumber", {
                                                        required: "phoneNumber is required",
                                                    })}
                                                />
                                            </div>
                                            {errors.phoneNumber && (
                                                <p className="alert alert-danger p-0">
                                                    {errors.phoneNumber.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <label className={`${Styles.textGold}`}>Password</label>
                                            <div>
                                                <input
                                                    type={visible ? "text" : "password"}
                                                    className={`${Styles.input} p-1 text-white w-100 z-0`}
                                                    placeholder="Enter your Password"
                                                    {...register("password", {
                                                        required: "password is required",
                                                    })}
                                                />
                                                <span
                                                    onClick={() => setVisible(!visible)}
                                                    className={`${Styles.passEye} text-white px-5 position-absolute d-inline-block`}
                                                >
                                                    {visible ? (
                                                        <i className="fa-regular fa-eye  "></i>
                                                    ) : (
                                                        <i className="fa-regular fa-eye-slash "></i>
                                                    )}
                                                </span>
                                            </div>
                                            {errors.password && (
                                                <p className="alert alert-danger p-0">
                                                    {errors.password.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="col md-6">
                                            <label className={`${Styles.textGold}`}>
                                                Confirm Password
                                            </label>
                                            <div>
                                                <input
                                                    type={visible ? "text" : "password"}
                                                    className={`${Styles.input} p-1 text-white w-100`}
                                                    placeholder="Confirm New Password"
                                                    {...register("confirmPassword", {
                                                        required: "confirm Password is required",
                                                        validate: (value) =>
                                                            value === password.current ||
                                                            "The passwords do not match",
                                                    })}
                                                />
                                                <span
                                                    onClick={() => setVisible(!visible)}
                                                    className={`${Styles.passEye2} text-white px-3 position-absolute d-inline-block`}
                                                >
                                                    {visible ? (
                                                        <i className="fa-regular fa-eye  "></i>
                                                    ) : (
                                                        <i className="fa-regular fa-eye-slash "></i>
                                                    )}
                                                </span>
                                            </div>
                                            {errors.confirmPassword && (
                                                <p className="alert alert-danger p-0">
                                                    {errors.confirmPassword.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button className={`${Styles.btnGold} btn px-5 w-50 text-white rounded-pill p-2 my-4`}>
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
