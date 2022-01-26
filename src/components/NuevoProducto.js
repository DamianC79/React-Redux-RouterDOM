import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { crearNuevoProductoAction } from '../actions/productoActions';
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaActions';


const NuevoProducto = ({history}) => {
   
    
    const [ nombre, guardarNombre ] = useState('');
    const [ precio, guardarPrecio ] = useState(0);

    const dispatch = useDispatch();

    const cargando = useSelector( state => state.productos.loading );
    const error = useSelector( state =>  state.productos.error)
    const alerta = useSelector( state => state.alerta.alerta)
    
    console.log(cargando)

    const agregarProducto= (producto) => dispatch( crearNuevoProductoAction(producto) )

    const SubmitNuevoProducto = e => {
        e.preventDefault();

        if( nombre.trim === '' || precio <= 0 ) {
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch( mostrarAlerta(alerta) );
            return
        }

        dispatch( ocultarAlerta() );

        agregarProducto({
            nombre,
            precio
        });

        history.push('/');
    }

    return(
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        { alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null }

                        <form
                            onSubmit={SubmitNuevoProducto}
                        >
                            <div className="form-group">
                                <label className="">Nombre del Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e =>  guardarNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="">Precio del Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio del Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e =>  guardarPrecio(Number(e.target.value))}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-wight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>
                        { cargando ? <p>Cargando...</p> : null }
                        { error ? <p className="alert alert-danger p2 text-center">Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
        )
}

export default NuevoProducto;