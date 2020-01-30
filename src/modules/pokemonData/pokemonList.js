import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';

import axios from 'axios';
import PokeList from '../../entities/pokemonData/pokemon-list'

export class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPokemon: null,
      dataRespon: null
    };
  }

  componentDidMount(){
    axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50`)
      .then(res => {
        const dataRespon = res.data;
        const dataPokemon = this.populateData(res.data);
        this.setState({ dataPokemon, dataRespon });
      })
   
  }

    populateData = (entity) => {
      return entity.results.reduce((acc,item,index) => {
          if(item){
            var str = item.url;
            var res = str.substring(34, str.length);
            var id = res.substring(0, res.length-1);
            
            let tmpJson = {
              "name": item.name,
              "url": item.url,
              "id": id
          };
            acc[index]=tmpJson
          }
          return acc
        } , [])
    }

    nextPage =(next)=> {
      axios.get(next)
      .then(res => {
        const dataRespon = res.data;
        const dataPokemon = this.populateData(res.data);
        this.setState({ dataPokemon, dataRespon });
      })
    }
    prevPage =(prev)=>{
      axios.get(prev)
      .then(res => {
        const dataRespon = res.data;
        const dataPokemon = this.populateData(res.data);
        this.setState({ dataPokemon, dataRespon });
      })
    }

    // goToDetail =(id)=>{
    //     <Link to={`${this.props.match.url}/${id}`}/>
    // }
  
  render(){
    const {dataPokemon, dataRespon} = this.state;
   
    return (
      <div className="animated">
        <Row >
          <Col md="12">
            <Card>
              <CardBody className="gambarBelakang">
                {
                  dataPokemon ?
                    <PokeList 
                      pokemon = {dataPokemon}
                      match = {this.props.match}
                    />
                 :
                 null
                }
                <div>
                  <br></br>
                  { dataRespon ?
                    dataRespon.next && dataRespon.previous  ?
                    <div>
                      <Button size="md" color="primary" className="float-right" onClick={e => this.nextPage(dataRespon.next)}>
                          Next<i className="fa fa-chevron-right"></i> 
                      </Button>
                      <Button size="md" color="danger" className="float-right mr-2" onClick={e => this.prevPage(dataRespon.previous)}>
                          <i className="fa fa-chevron-left"></i> Previous
                      </Button>
                     </div> 
                    : dataRespon.next ? 
                      <Button size="md" color="primary" className="float-right" onClick={e => this.nextPage(dataRespon.next)}>
                          Next<i className="fa fa-chevron-right"></i> 
                      </Button>
                    :
                    <Button size="md" color="danger" className="float-right mr-2" onClick={e=> this.prevPage(dataRespon.previous)}>
                      <i className="fa fa-chevron-left"></i> Previous
                    </Button>
                    :null
                  }
                  
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


export default PokemonList;