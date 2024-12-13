interface Inputs {
    nombre1: string;
    nombre2: string;
    apellido1: string;
    apellido2: string;
    email: string;
    user_name: string;
    password: string;
    foto: string;
    type: string;
}

interface ValidationErrors {
    nombre1?: string;
    nombre2?: string;
    apellido1?: string;
    apellido2?: string;
    email?: string;
    user_name?: string;
}

export const validateInputs = (inputs: Inputs): ValidationErrors => {
    const errors: ValidationErrors = {};

    // Expresiones regulares para validación
    const onlyLettersRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const userNameRegex = /^[a-zA-Z0-9@_]+$/;

    // Validación de nombre1
    if (!inputs.nombre1.trim()) {
        errors.nombre1 = "El primer nombre es obligatorio.";
    } else if (!onlyLettersRegex.test(inputs.nombre1)) {
        errors.nombre1 = "El primer nombre solo puede contener letras.";
    }

    // Validación de nombre2
    if (inputs.nombre2 && !onlyLettersRegex.test(inputs.nombre2)) {
        errors.nombre2 = "El segundo nombre solo puede contener letras.";
    }

    // Validación de apellido1
    if (!inputs.apellido1.trim()) {
        errors.apellido1 = "El primer apellido es obligatorio.";
    } else if (!onlyLettersRegex.test(inputs.apellido1)) {
        errors.apellido1 = "El primer apellido solo puede contener letras.";
    }

    // Validación de apellido2
    if (inputs.apellido2 && !onlyLettersRegex.test(inputs.apellido2)) {
        errors.apellido2 = "El segundo apellido solo puede contener letras.";
    }

    // Validación de email
    if (!inputs.email.trim()) {
        errors.email = "El correo electrónico es obligatorio.";
    } else if (!emailRegex.test(inputs.email)) {
        errors.email = "El formato del correo electrónico no es válido.";
    }

    // Validación de user_name
    if (!inputs.user_name.trim()) {
        errors.user_name = "El nombre de usuario es obligatorio.";
    } else if (!userNameRegex.test(inputs.user_name)) {
        errors.user_name = "El nombre de usuario solo puede contener letras y dígitos.";
    }

    return errors;
};