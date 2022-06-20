export default function validate(user) {
    let errors = {};
    if (!user.userEmail) {
        errors.email = 'Se requiere un correo electrónico';
    }else if (!/\S+@\S+\.\S+/.test(user.userEmail)) {
        errors.username = 'El email es inválido';
    }

    if (!user.userPassword) {
    errors.password = 'Se requiere una contraseña';
    } else if (user.userPassword.length<6) {
    errors.password = 'La contraseña es muy corta';
    }
    return errors;
}
