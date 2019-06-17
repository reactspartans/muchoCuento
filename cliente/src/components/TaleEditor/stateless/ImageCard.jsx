import React, { Component } from 'react'







export class ImageCard extends Component {

  constructor(props) {
    super(props)


  }




  render() {
    // console.log(this.props)
    return (
      <div className="card-image">
        <article className="card">
          <img className="card-img-top" src={this.props.imageURL} alt={this.props.name} />
          <header className="card-body">
            <h5 className="card-title">{this.props.name}</h5>
            {/*  <Link className="btn btn-sm btn-outline-dark" to={`/coasters/${theImage._id}`}> Seleccionar </Link> */}


            <button onClick={() => this.props.nuevaImg(this.props.imageURL, this.props.status)}>Seleccionar imagen</button>
          </header>
        </article>
      </div>
    )
  }


}

export default ImageCard








