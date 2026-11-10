import React from "react";
import { TABLE_PAGE_SIZE } from "../constants";

export function usePaginatedSearch<T>(items: T[], getSearchText: (item: T) => string) {
    const [query, setQuery] = React.useState("");
    const [requestedPage, setPage] = React.useState(1);

    const normalizedQuery = query.trim().toLowerCase();
    const filteredItems = normalizedQuery
        ? items.filter((item) => getSearchText(item).toLowerCase().includes(normalizedQuery))
        : items;

    const pageCount = Math.max(1, Math.ceil(filteredItems.length / TABLE_PAGE_SIZE));
    const page = Math.min(requestedPage, pageCount);
    const pageItems = filteredItems.slice((page - 1) * TABLE_PAGE_SIZE, page * TABLE_PAGE_SIZE);

    const changeQuery = (value: string) => {
        setQuery(value);
        setPage(1);
    };

    return { query, changeQuery, page, setPage, pageCount, pageItems };
}
