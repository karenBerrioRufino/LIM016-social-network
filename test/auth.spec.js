/* eslint-disable no-console */
// Importamos las funciones de firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  signInWithPopup,
  sendPasswordResetEmail,
} from '../src/lib/firebase/config';

// Importamos las funciones que vamos a testear
import {
  createUser,
  loginUser,
  userStateChange,
  logOutUser,
  signInGoogle,
  resetPassword,
  emailVerification,
} from '../src/lib/firebase/auth';

// Llamamos a la función que mockea las funciones de firebase
jest.mock('../src/lib/firebase/config.js');

// Testeando el registro de un usuario con firebase - auth
describe('probar la función createUser', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof createUser).toBe('function');
  });
  it('Debería poder registrar a un usuario', () => createUser('marita@gmail.com', '12355687').then(() => {
    expect(createUserWithEmailAndPassword.mock.calls[0][1]).toBe('marita@gmail.com');
    expect(createUserWithEmailAndPassword.mock.calls[0][2]).toBe('12355687');
  }));
});

// testeando el inicio de sesión del usuario
describe('probar la función loginUser', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof loginUser).toBe('function');
  });
  it('Debería permitir que el usuario entre a la app', () => {
    loginUser('marita@gmail.com', '12355687').then(() => {
      expect(signInWithEmailAndPassword.mock.calls[0][1]).toBe('marita@gmail.com');
      expect(signInWithEmailAndPassword.mock.calls[0][2]).toBe('12355687');
    });
  });
});

// testeando el estado del usuario
describe('probar la función userStateChange', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof userStateChange).toBe('function');
  });
  it('Debería permitir obtener los datos del usuario', () => {
    const user = () => {};
    userStateChange(user).then(() => {
      expect(onAuthStateChanged.mock.calls[0][1]).toBe(user);
    });
  });
});

// testeando la función para cerrar sesión
describe('probar la función signOut', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof logOutUser).toBe('function');
  });
  it('Debería salir de sesión', (done) => {
    logOutUser().then(() => {
      expect(signOut.mock.calls[0][1]).toBe(undefined);
    });
    done();
  });
});

// testeando el envio de un link al correo para que el usuario pueda iniciar sesión
describe('probar la función sendEmailVerification', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof emailVerification).toBe('function');
  });
  it('Debería enviar un email de verificación al usuario', (done) => {
    sendEmailVerification().then(() => {
      expect(sendEmailVerification.mock.calls[0][1]).toBe(undefined);
    });
    done();
  });
});

// testeando el inicio de sesión con google
describe('probar la función signInWithPopup', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof signInGoogle).toBe('function');
  });
  it('Debería abrir el popup de google', () => {
    signInWithPopup().then((result) => {
      expect(signInWithPopup.mock.calls[0][1]).toBe(result.user);
    });
  });
});

// testeando una funcion que envia un link al correo para que restablezca su contraseña
describe('probar la funcion de restablecimiento de contraseña', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof resetPassword).toBe('function');
  });
  it('Envia un link al correo electronico para restablecer su contraseña', (done) => {
    const res = sendPasswordResetEmail('alcantarakaly@gmail.com');
    res.then(() => {
      expect(sendPasswordResetEmail.mock.calls[0][1]).toBe(undefined);
    });
    done();
  });
});
