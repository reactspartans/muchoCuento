import React, {Component} from 'react'
import BookService from '../../services/book-service'
import {BookCard} from './Book-card'

export class MyBooks extends Component{
    constructor(props){
        super(props)
        this.state={
            myBooks:''
        }
        this.services= new BookService()
        console.log(this.props.user)
    }


    componentDidMount(){
        const id=this.props.user
        this.services.getUserBook(id)
            .then(theBooks=>this.setState({ Books: theBooks}))
    }




    render(){
        return(
            <div>
            <h2>Mis cuentos</h2>
            {this.state.Books ? this.state.Books.map((elm, idx)=><BookCard redir={this.props.redir} key={idx} {...elm}/>)  :  null}
            </div>
        )
    }
}