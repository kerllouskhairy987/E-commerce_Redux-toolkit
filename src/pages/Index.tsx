import CustomHook from '../hook/CustomHook'
import type { IProduct } from '../interfaces'
import Card from '../ui/Card'

const Home = () => {
    const { data, isLoading } = CustomHook({ queryKey: ["products__"], url: "https://dummyjson.com/products" })
    console.log(data, isLoading)
    const renderProduct = () => (
        data.products.map(({ id, price, rating, thumbnail, title, quantity }: IProduct) => <Card key={id} id={id} price={price} rating={rating} thumbnail={thumbnail} title={title} quantity={quantity} />)
    )
    if (isLoading) return <h1>Loading...</h1>
    return (
        <div className='container mx-auto px-2 mt-5 flex flex-wrap items-center justify-center gap-5'>
            {renderProduct()}
        </div>
    )
}

export default Home