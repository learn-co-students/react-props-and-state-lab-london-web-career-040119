import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeType = (e) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: e.target.selectedOptions[0].value
      }
    })
  }

  fetchPets = (e) => {
    let url = '/api/pets'
    if (this.state.filters.type !== 'all') {
      url += `?type=${this.state.filters.type}`
    }
    console.log('fetchpets', url);
    fetch(url)
      .then(resp => resp.json())
      .then(pets => this.setState({
        pets: pets
      }))
      .catch(console.error)
  }

  adoptPet = (id) => {
    console.log('id :', id);
    const pet = this.state.pets.find(p => p.id === id);
    pet.isAdopted = true;
    this.setState({
      ...this.state.pets,
      pet
    })
  }
  
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
