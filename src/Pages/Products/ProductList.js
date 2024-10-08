import Products from '../Products/Products';



let products = [
    {
        pID: 1, 
        pName: 'Fresh Milk', 
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit fuga autem maiores necessitatibus.',
        isAvailable: true,
        image: '../../src/images/fresh-milk.png',
        price: 12
    },
    {
        pID: 2, 
        pName: 'Cottage Cheese', 
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit fuga autem maiores necessitatibus.',
        isAvailable: false,
        image: "../.../src/images/cottage-cheese.png",
        price: 10
    },
    {
        pID: 3, 
        pName: 'Brocoli', 
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit fuga autem maiores necessitatibus.',
        isAvailable: true,
        image: "../../src/images/brocoli.png",
        price: 15
    },
    {
        pID: 4, 
        pName: 'oranges', 
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit fuga autem maiores necessitatibus.',
        isAvailable: true,
        image: "../../src/images/oranges.png",
        price: 20
    },
    {
        pID: 5, 
        pName: 'Olive oil', 
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit fuga autem maiores necessitatibus.',
        isAvailable: false,
        image: "../../src/images/olive-oil.png",
        price: 14
    }
  ]


function ProductList(){
return(
    <div className='row'>
    <div className='col-lg-8 mx-auto'>
      <div className='list-group shadow'>

    
      <Products id={products[0].id} 
      name={products[0].pName} 
      description={products[0].desc}
      image={products[0].image}
      price={products[0].price}
      isAvailable={products[0].isAvailable}
      > </Products>

      <Products id={products[1].id} 
      name={products[1].pName} 
      description={products[1].desc}
      isAvailable={products[1].isAvailable}
      image={products[1].image}
      price={products[1].price}></Products>
      <Products id={products[2].id} 
      name={products[2].pName} 
      isAvailable={products[2].isAvailable}
      description={products[2].desc}
      image={products[2].image}
      price={products[2].price}></Products>
      <Products id={products[3].id} 
      name={products[3].pName} 
      isAvailable={products[3].isAvailable}
      description={products[3].desc}
      image={products[3].image}
      price={products[3].price}></Products>
      <Products id={products[4].id} 
      name={products[4].pName}   
       isAvailable={products[4].isAvailable}
      description={products[4].desc}
      image={products[4].image}
      price={products[4].price}></Products>
    </div>
    </div>
      {/* <Routes>
        <Route path="/" element={<Products/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="HomePage" element={<HomePage/>}/>
      </Routes> */}
  </div> 
)
}

export default ProductList