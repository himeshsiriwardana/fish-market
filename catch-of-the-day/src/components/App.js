import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order"
import sampleFishes from "../sample-fishes";
import Fish from './Fish';
import base from '../base';
import EditFishForm from './EditFishForm';


class App extends Component{

    state = {
        fishes: {},
        order: {}
    }
    
    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount(){

        const {params} = this.props.match;
        //first reinstate our local storage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef){
            this.setState({order: JSON.parse(localStorageRef)});
        }
        
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });   
    }

    componentDidUpdate(){
        console.log(this.state.order);
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
        
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

  

    addFish = fish => {
        //Take a copy of the existing state
        const fishes = {...this.state.fishes};

        //Add a new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;

        //set the new fishes object to state
        this.setState({fishes});
        
    };

    updateFish = (key,updatedFish) => {
        
        const fishes = {...this.state.fishes};

        //update the fish
        fishes[key] = updatedFish;

        //set the state
        this.setState({fishes});
    }

    deleteFish = key => {
        //1. take a copy of state
        const fishes = { ...this.state.fishes };
        
        fishes[key] = null;

        //update state
        this.setState({fishes});
    }

    removeFromOrder = key => {
        const order = { ...this.state.order }

        delete order[key];

        this.setState({order})
    }

    loadSampleFishes = () => {this.setState({fishes: sampleFishes})};

    addToOrder = key => {
        //take a copy of state
        const order = {...this.state.order};

        //add to order or update number to order
        order[key] = order[key] + 1 || 1;

        //Call setState to udate state object
        this.setState({order});
    }
s
    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" age={100}/> 
                    <ul className='fishes'>
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)}
                    </ul>
                </div>
                 <Order fishes={this.state.fishes} order={this.state.order} 
                     removeFromOrder={this.removeFromOrder}
                 />
                 <Inventory 
                 addfish={this.addFish} 
                 updateFish = {this.updateFish}
                 loadSampleFishes={this.loadSampleFishes}
                 fishes={this.state.fishes}
                 storeId={this.props.match.params.storeId}

                  />
                
            </div>

            
        )
    }
}

export default App;
