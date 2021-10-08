import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup } from 'reactstrap'


const data = [
    { Id: '1', Descripción: "Producto de Prueba", Valor_Unitario: "200", Estado: "Disponible" },
];

class Productos extends Component {

    state = {
        data: data,
        form: {
            Id: '',
            Descripción: '',
            Valor_Unitario: '',
            Estado: '',
        },
        modalInsertar: false,
        modalEditar: false,
        buscar: '',
        product: [],
    };

    handleChange = e => {
        this.setState({
            
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            } 
        });
    }

    onChange = async e => {
        e.persist();
        await this.setState({ buscar: e.target.value });
        console.log(this.state.buscar);
        this.filtrarElementos();
    }

    mostrarModalInsertar = () => {
        this.setState({ modalInsertar: true });
    }
    mostrarModalEditar = (registro) => {
        this.setState({ modalEditar: true, form: registro });
    }

    ocultarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    }
    ocultarModalEditar = () => {
        this.setState({ modalEditar: false });
    }

    insertar = () => {
        var valorNuevo = { ...this.state.form };
        valorNuevo.Id = this.state.data.length + 1;
        var lista = this.state.data;
        lista.push(valorNuevo);
        this.setState({ data: lista, modalInsertar: false });
    }

    editar = (dato) => {
        var contador = 0;
        var lista = this.state.data;
        lista.map((registro) => {
            if (dato.Id == registro.Id) {
                lista[contador].Descripción = dato.Descripción;
                lista[contador].Valor_Unitario = dato.Valor_Unitario;
                lista[contador].Estado = dato.Estado;
            }
            contador++;

        });
        this.setState({ data: lista, modalEditar: false });
    }

    eliminar = (dato) => {
        var opcion = window.confirm("Esta seguro de eliminar el registro? " + dato.Id);
        if (opcion) {
            var contador = 0;
            var lista = this.state.data;
            lista.map((registro) => {
                if (registro.Id == dato.Id) {
                    lista.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ data: lista });
        }
    }

    componentDidMount() {
        this.setState({ product: data })
    }
    filtrarElementos = () => {
        var search = this.state.data.filter((elemento) => {
            if (elemento.Descripción.includes(this.state.buscar) ||
                elemento.Estado.includes(this.state.buscar) ||
                elemento.Id.toString().includes(this.state.buscar) ||
                elemento.Valor_Unitario.toString().includes(this.state.buscar)) {
                return elemento;
            }
        });
        this.setState({ product: search });
    }

    render() {
        return (
            <Fragment className="Productos">

                <Container className="CProductos">
                    <h2>Módulo administrador de productos</h2>
                    <br />

                    <label className="Lfind">Busqueda: </label>
                    <input className="find" name="find" type="text" value={this.state.buscar} onChange={this.onChange} />
                    <br />
                    <Button color="info" className="insertar" onClick={() => this.mostrarModalInsertar()} >Insertar Producto</Button>
                    <br /> <br />
                    <Table class="table table-striped">
                        <thead class="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>Descripción</th>
                                <th>Valor_Unitario</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.product.map((elemento) =>
                                <tr>
                                    <td>{elemento.Id}</td>
                                    <td>{elemento.Descripción}</td>
                                    <td>{elemento.Valor_Unitario}</td>
                                    <td>{elemento.Estado}</td>
                                    <td><Button color="primary" onClick={() => this.mostrarModalEditar(elemento)}>Editar</Button> </td>
                                    {""}
                                    <td><Button color="danger" onClick={() => this.eliminar(elemento)}>Eliminar</Button> </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Container>

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div>
                            <h3>Insertar Registro</h3>
                        </div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>Id:</label>
                            <input className="form-control" readOnly type="text" value={this.state.data.length + 1}  />
                        </FormGroup>

                        <FormGroup>
                            <label>Descripción</label>
                            <input className="form-control" name="Descripción" type="text" onChange={this.handleChange} required="required"/>
                        </FormGroup>

                        <FormGroup>
                            <label>Valor_Unitario</label>
                            <input className="form-control" name="Valor_Unitario" type="text" onChange={this.handleChange} placeholder="$" required="required"/>
                        </FormGroup>

                        <FormGroup>
                            <label>Estado</label>
                            <select className="form-control" name="Estado" onChange={this.handleChange} required="required">
                                <option>Disponible</option>
                                <option>No Disponible</option>
                            </select>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.insertar()}>Insertar</Button>
                        <Button color="danger" onClick={() => this.ocultarModalInsertar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>



                <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader>
                        <div>
                            <h3>Editar Registro</h3>
                        </div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>Id:</label>
                            <input className="form-control" readOnly type="text" value={this.state.form.Id} />
                        </FormGroup>

                        <FormGroup>
                            <label>Descripción</label>
                            <input className="form-control" name="Descripción" type="text" onChange={this.handleChange} value={this.state.form.Descripción} required="required"/>
                        </FormGroup>

                        <FormGroup>
                            <label>Valor_Unitario</label>
                            <input className="form-control" name="Valor_Unitario" type="text" required="required" onChange={this.handleChange} value={this.state.form.Valor_Unitario} placeholder="$"></input>
                        </FormGroup>

                        <FormGroup>
                            <label>Estado</label>
                            <select className="form-control" name="Estado" required="required" onChange={this.handleChange} value={this.state.form.Estado}>
                                <option>Disponible</option>
                                <option>No Disponible</option>
                            </select>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.editar(this.state.form)}>Editar</Button>
                        <Button color="danger" onClick={() => this.ocultarModalEditar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>




            </Fragment>
        );
    }

}
export default Productos