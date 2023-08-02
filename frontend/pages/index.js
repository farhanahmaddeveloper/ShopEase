import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
import { useFetchUser } from '../utils/authContext';
import Header from "@/components/Header";
const maxResult = 6;
export default function Home({ products }) {
    const { user } = useFetchUser();
    return (
        <Wrapper user={user}>
            <Header/>
            <main>
                <HeroBanner />

                {/* heading and paragaph start */}
                <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
                    <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                        Trending Products
                    </div>
                    <div className="text-md md:text-xl">
                        We are providing Top Quality Brand T-Shirt and Jeans for Men and Women
                    </div>
                </div>
                {/* heading and paragaph end */}

                {/* products grid start */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
                    {products?.data?.map((product) => (
                        <ProductCard key={product?.id} data={product} />
                    ))}

                </div>
                {/* products grid end */}

            </main>
        </Wrapper>
    );
    
}

export async function getStaticProps() {
    const products = await fetchDataFromApi(`/api/products?populate=*&pagination[pageSize]=${maxResult}`);

    return {
        props: { products },
    };
}






