import React, { Component } from 'react';
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import LazyLoad from 'react-lazy-load';
import { Button } from 'reactstrap';

import { Link } from 'react-router-dom';



export default class PokemonDataList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlImg : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
    };
  }
 
  // detail=(id)=>{
  //   <Link to={`${this.props.match.url}/${id}`} onClick={this.handleClick}/>
  //   //this.props.goToDetail(id);
  // }
 

  render() {
   const {pokemon} = this.props;
   const {urlImg}=this.state;
    return (
      <Row gutter={40}>
        {
          pokemon.map( (data)=>
        
          <Link key={data.id} to={`pokemon-detail/${data.id}`}>
            <Col style={{textAlign:"center"}} md={{ span: 4}} >
                <LazyLoad>
                  <img src={urlImg+data.id+".png"} alt={data.name}/>
                </LazyLoad>
                <div style={{width:100}}>{data.name}</div>
            </Col>
         </Link>  
          )
        }
   </Row>
   

    );
  }
}


