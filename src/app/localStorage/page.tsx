'use client'

import React, { useRef, useState,useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import useOnClickOutside from '@/hooks/useOnClickOutside';

const ExampleComponent = () => {

    // Define keys for the two pieces of data
    const firstDataKey = 'firstData';
    const secondDataKey = 'secondData';

    // Use the useLocalStorage hook to store and retrieve the first piece of data
    const [firstData, setFirstData] = useLocalStorage("firstData", firstDataKey);

    // Use the useLocalStorage hook to store and retrieve the second piece of data
    const [secondData, setSecondData] = useLocalStorage('secondData', secondDataKey);

    // Update first data
    // const updateFirstData = () => {
    //     setFirstData(null);
    // };

    // // Update second data
    // const updateSecondData = () => {
    //     const newValue = 'newSecondData';
    //     if (secondData !== newValue) {
    //         setSecondData(newValue);
    //     }
    // };

    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        console.log('Clicked outside!');
    };

    // Attach the useOnClickOutside hook to the ref and handler function
    useOnClickOutside(ref, handleClickOutside);

    type productParam = {
        id: number,
        name: string,
        count: number
    }


    const products = [
        { id: 1, name: "product1" },
        { id: 2, name: "product2" }
    ]

    const [carts, setCarts] = useState<any>([])

    const addToCart = (product: productParam) => {
        setCarts((preValue: productParam[]) => {
            return [...preValue, product]
        })
    };

    const remove = (product: any) => {
        const updatedCart = carts.filter((item: productParam) => item.id !== product.id)
        setCarts(updatedCart);
    }

    const increase = (id: number) => {
        const updatedCart = carts.map((item: productParam) => item.id === id ? { ...item, count: item.count + 1 } : item)
        setCarts(updatedCart);
    }

    const decrease = (id: number) => {
        const updatedCart = carts.map((item:productParam) => item.id === id ? { ...item, count: Math.max(1, item.count - 1) } : item)
        setCarts(updatedCart);
    }

    const [hasMounted, setHasMounted] = useState(false);

    // After the component has mounted, update hasMounted
    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted ?(
        <div>
            <div>First Data: {firstData}</div>
            <div>Second Data: {secondData}</div>
            {/* <button onClick={updateFirstData}>Update First Data</button>
            <button onClick={updateSecondData}>Update Second Data</button> */}
            <div ref={ref}>
                Click outside this element to trigger the console log.

            </div>

            {products.map((item) => <div key={item.id}>{item?.name}<button onClick={() => addToCart({ id: item.id, name: item.name, count: 1 })}>Add to cart</button><button onClick={() => remove(item)}>Remove</button></div>)}
            {carts && carts.map((item: any) => <div key={item.id}> {item.name} - Quantity: {item.count}<button onClick={() => increase(item.id)}>+</button><button onClick={() => decrease(item.id)}>-</button></div>)}
        </div>
    ):null
};

export default ExampleComponent;