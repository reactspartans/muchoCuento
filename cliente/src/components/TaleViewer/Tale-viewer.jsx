import React, {Component} from "react";
import { Carousel } from "react-responsive-carousel";


export class TaleViewer extends Component{
    constructor(props){
        super(props)
        this.state={
            bookID:'',
            pages:[]
        }
        
        console.log(this.props)
    }


    render(){
        return(
            <div className='paco'>
            <Carousel autoPlay>
              <div>
                <img src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" alt='bookimg'/>
              </div>
              <div>
                <img src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" alt='bookimg' />
              </div>
              <div>
                <img src="http://lorempixel.com/output/cats-q-c-640-480-3.jpg" alt='bookimg'/>
              </div>
              <div>
                <img src="http://lorempixel.com/output/cats-q-c-640-480-4.jpg" alt='bookimg'/>
              </div>
              <div>
                <img src="http://lorempixel.com/output/cats-q-c-640-480-5.jpg" alt='bookimg'/>
              </div>
              <div>
                <img src="http://lorempixel.com/output/cats-q-c-640-480-6.jpg" alt='bookimg'/>
              </div>
              <div>
                <img src="http://lorempixel.com/output/cats-q-c-640-480-7.jpg" alt='bookimg'/>
              </div>
              <div>
                <img src="http://lorempixel.com/output/cats-q-c-640-480-8.jpg" alt='bookimg'/>
              </div>
              <div>
                <img src="http://lorempixel.com/output/cats-q-c-640-480-9.jpg" alt='bookimg'/>
              </div>
              <div>
                <img src="http://lorempixel.com/output/cats-q-c-640-480-10.jpg" alt='bookimg'/>
              </div>
              <div>
                <img src="http://lorempixel.com/output/cats-q-c-640-480-11.jpg" alt='bookimg'/>
              </div>
              <div>
                <img src="http://lorempixel.com/output/cats-q-c-640-480-12.jpg" alt='bookimg'/>
              </div>
              <div>
                <img src="http://lorempixel.com/output/cats-q-c-640-480-13.jpg" alt='bookimg'/>
              </div>
              <div>
                <img src="http://lorempixel.com/output/cats-q-c-640-480-14.jpg" alt='bookimg'/>
              </div>
            </Carousel>
            </div>
        )
    }
}