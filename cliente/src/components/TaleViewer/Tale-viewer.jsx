import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import BookServices from '../../services/book-service'
import { URLSearchParams } from "url";

export class TaleViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookID: '',
      pages: []
    }
    this.services = new BookServices()
  }

  // componentDidMount(){
  //   this.services.bookDetail(this.props.match.params)
  //     .then(theBook=> console.log(theBook))
  // }

  componentDidMount() {
    this.services.bookDetail(this.props.match.params._id)
      .then(theBook => this.setState({
        book: theBook
      }))
  }


  render() {
    return (
      <div className='paco'>


        <Carousel autoPlay>

          {this.state.book ? this.state.book.pagesToView.map((page, idx) => <div><img key={idx} src={page.pagesToView} alt='bookimg' /></div>) : null}

        </Carousel>
      </div>
    )
  }
}