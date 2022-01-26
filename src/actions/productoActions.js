
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINADO,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    OBTENER_EDITADO_EXITO,
    OBTENER_EDITADO_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch( agregarProducto() )
    

        try {
            await clienteAxios.post('/productos', producto);

            dispatch( agregarProductoExito(producto) )
            
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
                console.log(error)
            dispatch( agregarProductoError(true) )   
            
            Swal.fire({
                icon:'error',
                title:'Hubo un error',
                text:'Hubo un error, intenta de nuevo'
            })
        }           
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload:true
})

const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

export function obtenerProductosAction () {
    return async ( dispatch ) => {
        dispatch( descargaProductos() );
    

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch( descargaProductosExitosa(respuesta.data) )
        } catch (error) {
            dispatch( descargaProductosError() )
        }
    }
}

const descargaProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = (productos) => ({
    type:DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

export function borrarProductoAction(id) {
    return async ( dispatch ) => {
        dispatch(obtenerProductosEliminar(id) )
    
        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch( eliminarProductoExito() );

            
            Swal.fire(
                'Eliminado!',
                'Producto eliminado.',
                'success'
              )
        } catch (error) {
            console.log(error)
            dispatch( eliminarProductoError() )
        }
    }
}

const obtenerProductosEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINADO,
    payload: id
})

const eliminarProductoExito = () => ({
    type:PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

export function obtenerProductoEditar(producto) {
    return(dispatch) => {
        dispatch( obtenerProductoAction(producto) )
    }
}

const obtenerProductoAction = (producto) => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch ( editarProducto() )

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto)
            dispatch( editarProductoExito(producto) )

        } catch (error) {
            console.log(error)
            dispatch(editarProductoError())
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
});

const editarProductoExito = (producto) => ({
    type: OBTENER_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: OBTENER_EDITADO_ERROR,
    payload: true
})