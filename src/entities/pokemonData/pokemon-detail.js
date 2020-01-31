import React, { Component } from 'react';
import { Col, Form, FormGroup, Label, Button, Badge, Modal, ModalBody, ModalHeader, ModalFooter, Input} from 'reactstrap';
import { Row, Col as Kolom} from 'react-simple-flex-grid';
import { Formik } from 'formik';
import gocha from '../../assets/img/brand/pokemongocha.png';
import { toast } from 'react-toastify';

import axios from 'axios';

export default class PokemonDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          urlImg : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
          modal: false,
          nickname: null
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.onChange = this.onChange.bind(this);
      }

    catchPoke=()=>{
        var probability = function(n) {
            return !!n && Math.random() <= n;
       };
       let a = probability(.5)
       if(a==true){
           this.toggleModal();
       }else{
       toast.error("Failed to catch")
       }
    }

    toggleModal = () => {
        this.setState({
          modal: !this.state.modal
        });
    }

    onChange(e) {
        this.setState({ 
            nickname: e.target.value 
        });
    }
    handleAddPokemon = () =>{
        const {pokemonEntity} = this.props;
        const {nickname} = this.state;
        
        let data ={
          "name": nickname ? nickname : pokemonEntity.name,
          "pokeId": pokemonEntity.id
        }
        axios.post('https://frozen-sea-89233.herokuapp.com/api/pokemon', data)
        .then(res => {          
            toast.success("Pokemon has been caught");
            this.setState({
                modal: !this.state.modal
              });
          })
      }

    render() {
        const { pokemonEntity } = this.props;
        const {urlImg}=this.state;
        return (
            <div>
                <div>
                <Col style={{textAlign:"center"}} md={{ span: 4}} >
                        <Button size="md" color="primary" className="float-right" onClick={e => this.catchPoke()}>
                            Catch 
                        </Button>
                 </Col>
                </div>
                <Form className="form-horizontal">
                    <FormGroup row>
                        <Col xs="12" md="12" style={{textAlign:"center"}}>
                            <img src={urlImg+pokemonEntity.id+".png"} alt={pokemonEntity.name}/>
                        </Col>
                    </FormGroup>
                    <Row>
                        <Col md="12" className="mb-4 mt-2">
                            <strong className="h5">Basic Data</strong>
                        </Col>
                    </Row>
                    <FormGroup row>
                        <Col md="3">
                            <Label for="name">Name</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <p className="form-control-static">{ pokemonEntity.name}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="height">Height</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <p className="form-control-static">{ pokemonEntity.height/10} m</p>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="Weight">Weight</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <p className="form-control-static">{ pokemonEntity.weight / 10 } kg</p>
                        </Col>
                    </FormGroup>
                    <Row>
                        <Col md="12" className="mb-4 mt-2">
                            <strong className="h5">Types</strong>
                        </Col>
                    </Row>
                    <Row gutter={40}>
                        {
                            pokemonEntity.types.map( (data)=>
                            <Kolom style={{textAlign:"center"}} md={{ span: 4}}  >
                                <Badge className={ data.type.name} style={{fontSize:'1em'}}>{ data.type.name }</Badge>
                            </Kolom>
                            )
                        }
                    </Row>
                    <Row>
                        <Col md="12" className="mb-4 mt-2">
                            <strong className="h5">Abilities</strong>
                        </Col>
                    </Row>
                    <Row gutter={40}>
                        {
                            pokemonEntity.abilities.map( (data)=>
                            <Kolom style={{textAlign:"center"}} md={{ span: 4}} >
                                <Badge style={{fontSize:'1em', backgroundColor:'#BCB3D0', color:'black'}}>
                                     { data.ability.name }
                                </Badge>
                                {/* <p className="form-control-static">{ data.ability.name }</p> */}
                            </Kolom>
                            )
                        }
                    </Row>
                    <Row>
                        <Col md="12" className="mb-4 mt-2">
                            <strong className="h5">Moves</strong>
                        </Col>
                    </Row>
                    <Row gutter={40}  style={{textAlign:"center"}}>
                        {
                            pokemonEntity.moves.map( (data)=>
                            <Kolom style={{textAlign:"center"}} xs={10} sm={8} md={6} lg={4} xl={2} className="mb-2 mt-2">
                                <Badge style={{fontSize:'1em', backgroundColor:'#BCB3D0', color:'white'}}>
                                     {  data.move.name }
                                </Badge>
                                {/* <p className="form-control-static">{ data.move.name }</p> */}
                            </Kolom>
                            )
                        }
                    </Row>
                </Form>
                
                    
                <Formik
                    render={
                        ({
                        values,
                        handleChange,
                        handleBlur,
                        }) => (
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add to My Pokemon List</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col style={{textAlign:"center"}}>
                                <img src={gocha} alt={pokemonEntity.name} style={{width:100, height:100}}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <Label for="name">Nickname</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" name="nickname" id="nickname" rows="2" placeholder="Name"
                                                        onChange={this.onChange}
                                                        onBlur={handleBlur}
                                                        value={values.nickname = this.state.nickname ? this.state.nickname : pokemonEntity.name}
                                                    />
                                
                            </Col>
                        </Row>
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button color="primary" onClick={(event) => this.handleAddPokemon()}><i className="fa fa-save"></i> Add</Button>
                        <Button color="secondary" onClick={this.toggleModal}><i className="fa fa-close"></i> Cancel</Button>
                    </ModalFooter> 
                </Modal>
                 )
                } 
            />    
            </div>
        );
    }
}
