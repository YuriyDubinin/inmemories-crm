import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import CryptoJS from 'crypto-js';
import QRCode from 'react-qr-code';

import './style/CreateUserForm.scss';

import InfoIcon from './assets/info.svg?jsx';

import {validateEmail} from '../../../../helpers/Validation';

const CreateUserForm = () => {
    const [key, setKey] = useState(null);
    const [qr, setQr] = useState(null);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: 'all',
        defaultValues: {
            date: Date.now(),
            name: '',
            suename: '',
            lastName: '',
            email: '',
            phone: '',
            closedAccount: false,
            password: '',
        },
    });

    const fieldDescription = {
        name: 'Имя пользователя',
        surname: 'Фамилия пользователя',
        lastName: 'Отчество пользователя',
        email: 'Емейл должен быть написан в стандартном формате и содержать в себе символ "@"',
        phone: 'Телефон пользователя должен начинаться с +7',
        password: 'Пароль пользователя',
    };

    const onSubmit = (data) => {
        const link = 'http://localhost:3000/';
        const key = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
        const totalLink = `${link}${key}`;

        setKey(key);
        setQr(totalLink);
    };

    return (
        <>
            <div className="create-user-form">
                <div className="create-user-form__row">
                    <div className="create-user-form__header">Создание нового пользователя</div>
                    <div className="create-user-form__body">
                        <form
                            className="create-user-form__body default-form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="default-form__input-wrapper create-user-form__input">
                                <div
                                    className="create-user-form__info-icon"
                                    onClick={() => {
                                        toast(fieldDescription.name, {
                                            icon: 'ℹ️',
                                        });
                                    }}
                                >
                                    <InfoIcon />
                                </div>
                                <input
                                    className="default-form__input"
                                    placeholder="Имя"
                                    {...register('name')}
                                />
                                {errors.email && (
                                    <span className="default-form__error-message">
                                        {errors.name?.message}
                                    </span>
                                )}
                            </div>
                            <div className="default-form__input-wrapper create-user-form__input">
                                <div
                                    className="create-user-form__info-icon"
                                    onClick={() => {
                                        toast(fieldDescription.surname, {
                                            icon: 'ℹ️',
                                        });
                                    }}
                                >
                                    <InfoIcon />
                                </div>
                                <input
                                    className="default-form__input"
                                    placeholder="Фамилия"
                                    {...register('surname')}
                                />
                                {errors.email && (
                                    <span className="default-form__error-message">
                                        {errors.surname?.message}
                                    </span>
                                )}
                            </div>
                            <div className="default-form__input-wrapper create-user-form__input">
                                <div
                                    className="create-user-form__info-icon"
                                    onClick={() => {
                                        toast(fieldDescription.lastName, {
                                            icon: 'ℹ️',
                                        });
                                    }}
                                >
                                    <InfoIcon />
                                </div>
                                <input
                                    className="default-form__input"
                                    placeholder="Отчество"
                                    {...register('lastName')}
                                />
                                {errors.email && (
                                    <span className="default-form__error-message">
                                        {errors.lastName?.message}
                                    </span>
                                )}
                            </div>
                            <div className="default-form__input-wrapper create-user-form__input">
                                <div
                                    className="create-user-form__info-icon"
                                    onClick={() => {
                                        toast(fieldDescription.phone, {
                                            icon: 'ℹ️',
                                        });
                                    }}
                                >
                                    <InfoIcon />
                                </div>
                                <input
                                    className="default-form__input"
                                    placeholder="Телефон"
                                    {...register('phone')}
                                />
                                {errors.email && (
                                    <span className="default-form__error-message">
                                        {errors.phone?.message}
                                    </span>
                                )}
                            </div>
                            <div className="default-form__input-wrapper create-user-form__input">
                                <div
                                    className="create-user-form__info-icon"
                                    onClick={() => {
                                        toast(fieldDescription.email, {
                                            icon: 'ℹ️',
                                        });
                                    }}
                                >
                                    <InfoIcon />
                                </div>
                                <input
                                    className="default-form__input"
                                    placeholder="Почта"
                                    {...register('email', {
                                        validate: (value) => validateEmail(value, true),
                                    })}
                                />
                                {errors.email && (
                                    <span className="default-form__error-message">
                                        {errors.email?.message}
                                    </span>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="default-form__submit-btn create-user-form__submit-btn"
                            >
                                Создать
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {qr && (
                <div className="create-user-form__qr">
                    <QRCode
                        size={256}
                        style={{height: 'auto', maxWidth: '100%', width: '100%'}}
                        value={qr}
                        viewBox={`0 0 256 256`}
                    />
                </div>
            )}
            {key && (
                <div className="create-user-form__key">
                    <p>Ваш уникальный ключ:</p>
                    <span>{key}</span>
                </div>
            )}
        </>
    );
};

export default CreateUserForm;
