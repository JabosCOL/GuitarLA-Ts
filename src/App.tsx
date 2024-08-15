import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { useEffect, useReducer } from "react"
import { cartReducer, initialState } from "./reducers/cart-reducer"

function App() {

  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <>
    <Header
      cart={state.cart}
      dispatch={dispatch}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Our collection</h2>

        <div className="row mt-5">
            {state.data.map((guitar) => (
                <Guitar
                  key={guitar.id}
                  guitar={guitar}
                  dispatch={dispatch}
                />
            ))}

        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - All rights reserved</p>
        </div>
    </footer>
    </>
  )
}

export default App
