import { useEffect, useState } from 'react'
import CustomHook from '../hook/CustomHook'
import { useQueryClient } from '@tanstack/react-query'
import type { IProduct } from '../interfaces'
import Card from '../ui/Card'
import Input from '../ui/Input'
import Pagination from '../components/Pagination'
import axiosInstance from '../config/axios.config'
import Button from '../ui/Button'

const Home = () => {
    const [page, setPage] = useState<number>(1);
    const [searchState, setSearchState] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedProductAccordingToCategory, setSelectedProductAccordingToCategory] = useState<IProduct[] | null>(null)

    const limit = 15;
    const skip = (page - 1) * limit
    const queryClient = useQueryClient()

    // Pagination
    const { data: dataPagination, isLoading: isLoadingPagination, isStale, refetch } = CustomHook({ queryKey: ["products", "pagination", `${page}`], url: `products?limit=${limit}&skip=${skip}` })
    const totalPages = Math.ceil(dataPagination?.total / limit);

    // Get Searched Products
    const { data: searchData } = CustomHook({ queryKey: ["products", "search", searchState], url: `products/search?q=${searchState}` })
    const isSearching = searchState.trim().length > 0

    // Get Product Categories list
    const { data: dataProductsCategories, isLoading: isLoadingProductCategories } = CustomHook({ queryKey: ["categories"], url: 'products/category-list' })

    // Get Products By Category    
    useEffect(() => {
        const fetchProductsCategory = async () => {
            if (selectedCategory) {
                try {
                    const { data } = await axiosInstance.get(`products/category/${selectedCategory}`);
                    setSelectedProductAccordingToCategory(data.products);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            } else {
                setSelectedProductAccordingToCategory(null);
            }
        };
        fetchProductsCategory();
    }, [selectedCategory]);

    // pre-fetching products by pagination 
    useEffect(() => {
        const nextPage = page + 1;
        const nextSkip = (nextPage - 1) * limit;

        // stop pre-fetching when there is no more data to fetch
        if (nextPage > totalPages) return;

        queryClient.prefetchQuery({
            queryKey: ["products", "pagination", nextPage],
            queryFn: () => axiosInstance.get(`products?limit=${limit}&skip=${nextSkip}`).then(res => res.data),
        });
    }, [page, queryClient, totalPages]);

    // Renders Products
    const renderProduct = () => {
        let productsToRender: IProduct[] = [];
        if (isSearching) {
            productsToRender = searchData?.products;
        } else if (selectedCategory && selectedProductAccordingToCategory) {
            productsToRender = selectedProductAccordingToCategory;
        } else if (selectedProductAccordingToCategory === null) {
            productsToRender = dataPagination?.products;
        }

        if (!productsToRender || productsToRender.length === 0) return <h2>No Product Found!</h2>

        return productsToRender.map(({ id, price, rating, thumbnail, title, quantity }: IProduct) => <Card key={id} id={id} price={price} rating={rating} thumbnail={thumbnail} title={title} quantity={quantity} />)
    }

    // renders product categories
    const renderCategories = dataProductsCategories?.map((category: string[], idx: number) => <option key={idx} value={category}>{category}</option>)

    if (isLoadingPagination) return <h1>Loading...</h1>
    if (isLoadingProductCategories) return <h1 className="border rounded px-10 py-3">Loading...</h1>

    return (
        <div className='container mx-auto px-2'>
            {/* Search */}
            <div className='flex flex-wrap items -start justify-center gap-5 mt-3 text-center'>
                <Input type='search' placeholder='Search'
                    value={searchState} onChange={(e) => setSearchState(e.target.value)}
                />
                <select onChange={(e) => setSelectedCategory((e.target as HTMLSelectElement).value)} name="select_category" id="select_category" className="border rounded px-10 py-3">
                    <option hidden >Categories</option>
                    <option value={""}>All</option>
                    {renderCategories}
                </select>
            </div>
            {/* button for update cashing */}
            {/* render products */}
            {
                isStale &&
                <Button type='button' onClick={() => refetch()} className="border rounded px-10 py-3 cursor-pointer sm:w-fit w-full mt-2">Update Cashing</Button>
            }
            {/* render products */}
            <div className='mt-5 flex flex-wrap items-center justify-center gap-5'>
                {renderProduct()}
            </div>
            {/* Pagination */}
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    )
}

export default Home