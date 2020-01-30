import React, { Component } from 'react';
import { CardGroup } from 'reactstrap';


class Dashboard extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <CardGroup className="mb-4" >
          <div>
            Pokemon
          </div>
        </CardGroup>
      </div>
    );
  }
}

export default Dashboard;
