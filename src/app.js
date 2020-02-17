import React from 'react';
import axios from 'axios';

export class Metrics extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    axios.get('http://localhost:2999/podsHealth')
      .then((res) => {
        this.setState({podsHealth: res, e: null})
      })
      .catch(e => {
        this.setState({e: e, podsHealth: null });
      });
  }

  render () {
    const {podsHealth, e} = this.state;
    const result = podsHealth && podsHealth.data ? podsHealth.data : [];
    return (
      <>
        <h1>Kubernetes Cluster Metrics</h1>
        {result.length === 0 && <p>Could not collect metrics</p>}
        {result.length > 0 && result.map(podData => {
          return <div>
            <h3>Name: {podData.name}</h3>
            <h4>CPU: {podData.cpu}</h4>
            <h4>Memory: {podData.memory}</h4>
          </div>;
        })}
      </>
  
    );
  };
}