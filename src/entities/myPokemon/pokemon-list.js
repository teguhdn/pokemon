import React, { Component } from 'react';
import { Row, Col as Kolom} from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import LazyLoad from 'react-lazy-load';
import { Col, Label, Button, Badge, Modal, ModalBody, ModalHeader, ModalFooter, Input} from 'reactstrap';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


export default class PokemonDataList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlImg : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      modal: false,
      dataDetail: null,
      nickname: null
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.onChange = this.onChange.bind(this);
  }
 
  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleGetDetail=(id, pokeId)=>{
    axios.get(`https://frozen-sea-89233.herokuapp.com/api/pokemon/${id}/${pokeId}`)
    .then(res => {
      const dataDetail = res.data.data;
        this.setState({ dataDetail,
        modal: !this.state.modal
       });
    })
  }
  
  onChange(e) {
    this.setState({ 
        nickname: e.target.value 
    });
  }
  handleReleasePokemon = (id, pokeId)=>{
    this.setState({
      modal: !this.state.modal
    });
    this.props.handleReleasePokemon(id, pokeId);
  }

  handleUpdatePokemon = (id, pokeId)=>{
    let {nickname, dataDetail} =this.state;
    let data ={
      "name": nickname ? nickname : dataDetail ? dataDetail.pokeName : "",
      "pokeId": pokeId
    }
    axios.put(`https://frozen-sea-89233.herokuapp.com/api/pokemon/${id}/${pokeId}`, data)
    .then(res => {          
        toast.success("Pokemon has been updated");
        this.setState({
            modal: !this.state.modal,
            nickname: null
          });
          this.props.handleGetList();
      })
  }

  render() {
   const {pokemon} = this.props;
   const {urlImg, dataDetail}=this.state;
    return (
      <div>
        <Row gutter={40}>
          {
            pokemon.map( (data)=>
            <Link key={data.id} to={"/my-pokemon"} onClick={e => this.handleGetDetail(data.id, data.pokeId)}>
              <Kolom style={{textAlign:"center"}} md={{ span: 4}} >
                  <LazyLoad>
                      <img src={urlImg+data.pokeId+".png"} alt={data.pokeName}/>
                  </LazyLoad>
                  <div style={{width:100}}>{data.pokeName}</div>
              </Kolom> 
            </Link> 
            )
          }
        </Row>
        <Formik
          render={
              ({
              values,
              handleChange,
              handleBlur,
              }) => ( 
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>My Pokemon</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col style={{textAlign:"center"}}>
                                {dataDetail ?
                              <img src={urlImg+dataDetail.pokeId+".png"} alt={dataDetail.pokeName}/> :
                              null  
                              }
                                  
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
                                    value={values.nickname = this.state.nickname ? this.state.nickname : dataDetail ? dataDetail.pokeName : ""}
                                />
                                
                            </Col>
                        </Row>
                    </ModalBody>
                    {
                      dataDetail ?
                        <ModalFooter>
                            <Button color="primary" onClick={(event) => this.handleUpdatePokemon(dataDetail.id, dataDetail.pokeId)}><i className="fa fa-save"></i> Save</Button>
                            <Button color="danger" onClick={(event) => this.handleReleasePokemon(dataDetail.id, dataDetail.pokeId)}><i class="fa fa-eraser"></i> Release</Button>
                            <Button color="secondary" onClick={this.toggleModal}><i className="fa fa-close"></i> Cancel</Button>
                        </ModalFooter> 
                    :
                      ""
                    }   
                </Modal>
                 )
                } 
            />
      </div>
      

   

    );
  }
}


