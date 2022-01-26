import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types';

export function mostrarAlerta(alerta) {
    return ( dispatch ) => {
        dispatch( crearAlerta(alerta) )
    }
}

const crearAlerta = (alerta) => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
})

export function ocultarAlerta(alerta){
    return( dispatch ) => {
        dispatch( alertaOcultar(alerta) )
    }
}

const alertaOcultar = () => ({
    type: OCULTAR_ALERTA
})