import React, { useCallback } from "react";
import { Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

type SearchBarProps = {
    value: string;
    onChange: (v: string) => void;
    debounceMs?: number;
    placeholder?: string;
};

export const SearchBar: React.FC<SearchBarProps> = React.memo(function SearchBar({
    value,
    onChange,
    placeholder = "Search products...",
}) {

    const handleSearch = useCallback(() => {
        onChange(value.trim());
    }, [onChange, value]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginBottom: 16,
            }}
        >
            <Space.Compact style={{ width: "100%", maxWidth: 500, minWidth: 300 }}>
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    allowClear
                    onPressEnter={handleSearch}
                    aria-label="Search"
                />
                <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={handleSearch}
                    style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                    }}
                />
            </Space.Compact>
        </div>
    );
});
