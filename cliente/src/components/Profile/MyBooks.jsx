import React, { Component } from 'react'
import BookService from '../../services/book-service'
import { YourBookCard } from './YourBookCard'

export class MyBooks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deleted: false,
            myBooks: ''
        }
        this.services = new BookService()
        console.log(this.props.user)
    }

    isDeleted = (books) => {
        this.setState({ Books: books })
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
                {(this.state.deleted || !this.state.deleted) &&
                    this.state.Books ? this.state.Books.map((elm, idx) => <YourBookCard isDeleted={this.isDeleted} getRedEdit={this.props.getRedEdit} redir={this.props.redir} key={idx} {...elm} />) : null
                }
            </div>
        )
    }
}