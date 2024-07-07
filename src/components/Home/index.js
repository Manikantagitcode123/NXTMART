import {Component} from 'react'

import Products from '../Products'
import Category from '../Category'
import EachCatagorie from '../EachCatagorie'

import Loader from 'react-loader-spinner'
import Header from '../Header'

import Footer from '../Footer'
import './index.css'
import {Link} from 'react-router-dom'

class Home extends Component {
  state = {
    products: [],
    issucess: 'loading',
    selectedited: 'all',
    filterd: [],
    categorielement: [],
    isallbtnclick: true,
  }
  componentDidMount() {
    this.getdata()
  }
  getdata = async () => {
    const {selectedited, isallbtnclick} = this.state
    //console.log(selectedited)

    this.setState({issucess: 'loading'})
    const url = 'https://run.mocky.io/v3/8177da5e-b2fd-4474-9bb7-457f4099ae4e'

    const response = await fetch(url)
    //console.log(response)
    if (response.ok == true) {
      const data = await response.json()
      //console.log(data)
      const filterdata = data.categories.filter(
        each => each.name == selectedited,
      )
      //console.log(filterdata)
      const notfilterdata = data.categories.filter(
        each => each.name != selectedited,
      )
      //console.log(notfilterdata)

      this.setState({
        products: notfilterdata,
        filterd: filterdata,
        issucess: 'sucess',
        categorielement: data.categories,
      })
    } else {
      this.setState({issucess: 'failed'})
    }
  }
  selecteditemuser = details1 => {
    //console.log(details1)
    this.setState(
      {selectedited: details1.name, isallbtnclick: false},
      this.getdata,
    )
  }
  pageloading = () => {
    return (
      <div className='loader-container loadercard' data-testid='loader'>
        <Loader type='ThreeDots' color='##279e27' height={50} width={50} />
      </div>
    )
  }
  failuresection = () => {
    return (
      <div>
        <div className='failure_card'>
          <img
            src='https://res.cloudinary.com/dzjxowhgb/image/upload/v1713534094/vgb9geae4v0cuqhn6ebq.png'
            alt='failure view'
          />
          <h1>Oops! Something went Wrong.</h1>
          <p>We are having some trouble.</p>
          <button onClick={this.getdata} className='retrybtn'>
            Retry
          </button>
        </div>
      </div>
    )
  }
  clickallbtn = () => {
    this.getdata()
    this.setState({isallbtnclick: true, selectedited: 'all'})
  }
  sucessdatahome = () => {
    const {products, filterd, categorielement, selectedited, isallbtnclick} =
      this.state
    const alldesignel = isallbtnclick ? 'applybgcolor' : 'allbtn'

    return (
      <div>
        <div className='homecard'>
          <div className='categoriecard'>
            <h1 className='categoriestext'>Categories</h1>
            <ul className='ullistform'>
              <li>
                <button className={alldesignel} onClick={this.clickallbtn}>
                  All
                </button>
              </li>
              {categorielement.map(each => {
                return (
                  <EachCatagorie
                    details={each}
                    selecteditemuser={this.selecteditemuser}
                    isseleted={each.name == selectedited}
                  />
                )
              })}
            </ul>
          </div>
          <div className='productcard'>
            <ul>
              {filterd.map(each => {
                return <Products key={each.name} productDetails={each} />
              })}
              {products.map(each => {
                return <Products key={each.name} productDetails={each} />
              })}
            </ul>
          </div>
        </div>

        <div className='homeheaderformb'>
          <Footer />
        </div>

        <div className='formbl'>
          <Header />
        </div>
      </div>
    )
  }
  switchcaseel = () => {
    const {issucess} = this.state
    switch (issucess) {
      case 'loading':
        return this.pageloading()
      case 'failed':
        return this.failuresection()
      case 'sucess':
        return this.sucessdatahome()
    }
  }
  render() {
    const {products, issucess} = this.state

    // console.log(products)

    return (
      <div className='bg_container'>
        <div className='homeheaderformb'>
          <Header />
        </div>

        {this.switchcaseel()}
      </div>
    )
  }
}
export default Home
