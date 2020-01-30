import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Button} from 'reactstrap';
import axios from 'axios';
import PokeDetail from '../../entities/pokemonData/pokemon-detail'
import { toast } from 'react-toastify';

class PokemonDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPokemon: null,
      dataRespon: null
    };
  
  }

  componentDidMount(){
    axios.get(`https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}`)
      .then(res => {
        const dataRespon = res.data;
        this.setState({ dataRespon });
      })
  }

 
  render() {
    const { dataRespon} = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="6">
            <h4>Pokemon Detail</h4>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
              {
                  dataRespon ?
                    <PokeDetail 
                      pokemonEntity = {dataRespon}
                      match = {this.props.match}
                      handleAddPokemon = {this.handleAddPokemon}
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

export default  PokemonDetail;