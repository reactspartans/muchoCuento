import React from 'react'

const ImageCard = theImage => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <article className="card">
        <img className="card-img-top" src={theImage.imageURL} alt={theImage.name} />
        <header className="card-body">
          <h5 className="card-title">{theImage.name}</h5>
          {/*  <Link className="btn btn-sm btn-outline-dark" to={`/coasters/${theImage._id}`}> Seleccionar </Link> */}
          <button>Seleccionar imagen</button>
        </header>
      </article>
    </div>
  )
}

export default ImageCard
