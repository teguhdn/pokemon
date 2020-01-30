import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';

import axios from 'axios';
import PokeList from '../../entities/myPokemon/pokemon-list'
import toast from 'react-toastify';

export class MyPokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPokemon: null,
      dataRespon: null
    };
  }

  componentDidMount(){
    axios.get(`https://frozen-sea-89233.herokuapp.com/api/pokemon`)
      .then(res => {
        const dataRespon = res.data.data;
       // const dataPokemon = this.populateData(res.data);
        this.setState({ dataRespon });
      })
   
  }

  handleReleasePokemon = (id, pokeId)=>{
    axios.delete(`https://frozen-sea-89233.herokuapp.com/api/pokemon/${id}/${pokeId}`)
      .then(res => {
        this.handleGetList();
      })
  }
  
  handleGetList=()=>{
    axios.get(`https://frozen-sea-89233.herokuapp.com/api/pokemon`)
    .then(res => {
      const dataRespon = res.data.data;
     // const dataPokemon = this.populateData(res.data);
      this.setState({ dataRespon });
    })
  }
  render(){
    const {dataRespon} = this.state;
   
    return (
      <div className="animated">
        <Row>
          <Col md="6">
            <h4>My Pokemon</h4>
          </Col>
        </Row>
        <Row >
          <Col md="12">
            <Card>
              <CardBody className="gambarBelakang">
                {
                  dataRespon ?
                    <PokeList 
                      pokemon = {dataRespon}
                      match = {this.props.match}
                      handleReleasePokemon = {this.handleReleasePokemon}
                      handleGetList = {this.handleGetList}
                    />
                 :
                 null
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


export default MyPokemonList;