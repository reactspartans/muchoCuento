import React, { Component } from 'react'
import BookService from '../../services/book-service'
import { YourBookCard } from './YourBookCard'

export class MyBooks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myBooks: ''
        }
        this.services = new BookService()
        console.log(this.props.user)
    }


    componentDidMount() {
        const id = this.props.user
        this.services.getUserBook(id)
            .then(theBooks => this.setState({ Books: theBooks }))
    }

    editBook() {
        const id = this.props.user
        this.services.bookEdit(id)
            .then(theBook => console.log(theBook))

    }



    render() {
        return (
            <div className='flex-book-card'>
                {this.state.Books ? this.state.Books.map((elm, idx) => <YourBookCard redir={this.props.redir} key={idx} {...elm} />) : null}
            </div>
        )
    }
}