import App from './App'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Shop from './pages/Shop'

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home />},
            { path: "shop", element: <Shop />},
            { path: "cart", element: <Cart />},
        ],
    },
]

export default routes;