import React from 'react'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useDispatch } from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';

const Producto = ({producto}) => {

    const { nombre, precio, id } = producto;

    const dispatch = useDispatch();
    const history = useHistory();

    const confirmarEliminarProducto = id => {

        Swal.fire({
            title: 'Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(borrarProductoAction(id))
            }
          });

    }

    const redireccionarEdicion = producto => {
        dispatch( obtenerProductoEditar(producto) )
        history.push(`/productos/editar/${producto.id}`)
    }

    return(
        <tr>
            <td>{nombre}</td>
            <td> <span className="font-weight-bold">$ {precio}</span> </td>
            <td className='acciones'>

                <button
                    type="button" 
                    onClick={()=> (redireccionarEdicion(producto))}
                    className="btn btn-primary mr-2"
                > Editar </button>

                <button
                    type='button'
                    className='btn btn-danger'
                    onClick={()=>confirmarEliminarProducto(id)}
                >Eliminar</button>

            </td>
        </tr>
    )
}

export default Producto;