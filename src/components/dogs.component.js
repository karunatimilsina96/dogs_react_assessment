import axios from "axios";
import React, { Component } from "react";
import { render } from "react-dom";

export default class Dogs extends React.Component {
  constructor() {
    super();
    this.state = {
      imgURL: "",
      breedList: [],
    };
  }

  componentDidMount() {
    const getRandomImage = async () => {
      const response = await axios.get(
        "https://dog.ceo/api/breeds/image/random"
      );

      this.setState({ imgURL: response.data.message });
    };

    const getBreedList = async () => {
      const response = await axios.get(
        "https://dog.ceo/api/breeds/list/random/10"
      );

      this.setState({ breedList: response.data.message });
    };

    getRandomImage();
    getBreedList();
  }

  getRandomBreedImage = (breedName) => {
    axios
      .get(`https://dog.ceo/api/breed/${breedName}/images/random`)
      .then((response) => {
        this.setState({
          imgURL: response.data.message,
        });
      })
      .catch((err) => {
        console.log("error fetching image:", err);
      });
  };

  render() {
    return (
      <div className="Dog">
        <h2>Random Dog Image</h2>
        <div>
          <img alt="" src={this.state.imgURL} />
        </div>
        <div className="Links">
          {this.state.breedList.map((breed, index) => {
            return (
              <button onClick={(_) => this.getRandomBreedImage(breed)}>
                {breed}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}
