import React, { useRef, useCallback } from "react";
import { Spin, Empty, Row, Col } from "antd";
import { useSearch } from "../hooks/useSearch";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
    query: string;
}

export const ProductList: React.FC<ProductListProps> = ({ query }) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
        useSearch(query);

    const observer = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isFetchingNextPage) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            });

            if (node) observer.current.observe(node);
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage]
    );

    const products = data?.pages.flatMap((page) => page.products) ?? [];

    if (status === "pending")
        return (
            <div style={{ textAlign: "center", marginTop: 48 }}>
                <Spin size="large" />
            </div>
        );

    if (status === "error") return <Empty description="Error loading products." />;

    if (!products.length) return <Empty description="No products found." />;

    // Determine card width based on number of products
    const getCardWidth = () => {
        if (products.length === 1) return 500; // single card wider
        if (products.length === 2) return 350; // two cards
        return 300; // default for multiple cards
    };

    const cardWidth = getCardWidth();

    return (
        <>
            <Row
                gutter={[16, 16]}
                justify={products.length < 3 ? "center" : "start"}
            >
                {products.map((p) => (
                    <Col
                        key={p.id}
                        xs={24}
                        sm={12}
                        md={8}
                        lg={6}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <div style={{ width: cardWidth, flex: 1 }}>
                            <ProductCard product={p} />
                        </div>
                    </Col>
                ))}
            </Row>

            <div ref={loadMoreRef} style={{ height: 40, textAlign: "center" }}>
                {isFetchingNextPage && <Spin />}
            </div>
        </>
    );
};




