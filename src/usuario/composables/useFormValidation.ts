export const useFormValidation = () => {

    const PasswordValidate = async (value: string, passwordLength:number, IsNew:boolean):Promise<any> => {
        if (IsNew || !(passwordLength === undefined || passwordLength === 0)) {
            if (!(/^.{8,}$/).test(value)) {
                return Promise.reject('La contraseña tiene menos de 8 caracteres');
            } else if (!(/.*[a-z].*/).test(value)) {
                return Promise.reject('La contraseña debe tener al menos una letra minuscula');
            } else if (!(/.*[A-Z].*/).test(value)) {
                return Promise.reject('La contraseña debe tener al menos una letra mayuscula');
            } else if (!(/.*[!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?].*/).test(value)) {
                return Promise.reject('La contraseña debe tener al menos un simbolo especial');
            } else if (!(/.*[0-9].*/).test(value)) {
                return Promise.reject('La contraseña debe tener al menos un numero');
            } else if (!(/^\S*$/).test(value)) {
                return Promise.reject('La contraseña no debe tener espacios en blanco');
            } else {
                return Promise.resolve();
            }
        }
    };

    const confirmationValidate = async (value: string, password:string, IsNew:boolean):Promise<any> => {
        if (IsNew || !(password?.length === undefined || password?.length === 0)) {
            if (password !== value) {
                return Promise.reject('La confirmación no coincide');
            } else {
                return Promise.resolve();
            }
        }
    };
    
    const emailValidate = async (value: string):Promise<any> => {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value)) {
            return Promise.reject('El formato del email es incorrecto');
        } else {
            return Promise.resolve();
        }
    };



    return {
        PasswordValidate,
        confirmationValidate,
        emailValidate
    }
}