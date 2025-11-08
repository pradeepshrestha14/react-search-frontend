import React from "react";
import { Card, Rate } from "antd";
import type { Product } from "../api/productApi";

const { Meta } = Card;

export const ProductCard: React.FC<{ product: Product }> = React.memo(
    ({ product }) => {
        return (
            <Card
                hoverable
                cover={
                    <img
                        alt={product.title}
                        src={product.thumbnail}
                        style={{
                            height: 180,
                            objectFit: "cover",
                            borderBottom: "1px solid #f0f0f0",
                        }}
                    />
                }
            >
                <Meta
                    title={product.title}
                    description={
                        <>
                            <div>Brand: {product.brand}</div>
                            <div>Category: {product.category}</div>
                            <div>Price: ${product.price}</div>
                            <Rate disabled allowHalf defaultValue={product.rating} />
                        </>
                    }
                />
            </Card>
        );
    }
);

