// Pagination hook for lists and tables
import { useState, useMemo, useCallback } from 'react';
import { PaginationParams, PaginatedResponse } from '../types/common';

interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
  totalItems: number;
}

export function usePagination(options: UsePaginationOptions) {
  const { initialPage = 1, initialLimit = 10, totalItems } = options;
  
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialLimit);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);

  const startIndex = useMemo(() => {
    return (currentPage - 1) * itemsPerPage;
  }, [currentPage, itemsPerPage]);

  const endIndex = useMemo(() => {
    return Math.min(startIndex + itemsPerPage, totalItems);
  }, [startIndex, itemsPerPage, totalItems]);

  const hasNextPage = useMemo(() => {
    return currentPage < totalPages;
  }, [currentPage, totalPages]);

  const hasPreviousPage = useMemo(() => {
    return currentPage > 1;
  }, [currentPage]);

  const goToPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  }, [totalPages]);

  const goToNextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasNextPage]);

  const goToPreviousPage = useCallback(() => {
    if (hasPreviousPage) {
      setCurrentPage(prev => prev - 1);
    }
  }, [hasPreviousPage]);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const goToLastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  const changeItemsPerPage = useCallback((newLimit: number) => {
    setItemsPerPage(newLimit);
    // Adjust current page to maintain position
    const currentStartIndex = (currentPage - 1) * itemsPerPage;
    const newPage = Math.floor(currentStartIndex / newLimit) + 1;
    setCurrentPage(newPage);
  }, [currentPage, itemsPerPage]);

  const getPageNumbers = useCallback((maxVisible: number = 5) => {
    const pages: number[] = [];
    const half = Math.floor(maxVisible / 2);
    
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    // Adjust start if we're near the end
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }, [currentPage, totalPages]);

  const paginateArray = useCallback(<T>(array: T[]): T[] => {
    return array.slice(startIndex, endIndex);
  }, [startIndex, endIndex]);

  const getPaginationParams = useCallback((): PaginationParams => {
    return {
      page: currentPage,
      limit: itemsPerPage
    };
  }, [currentPage, itemsPerPage]);

  const createPaginatedResponse = useCallback(<T>(items: T[]): PaginatedResponse<T> => {
    return {
      items: paginateArray(items),
      total: totalItems,
      page: currentPage,
      limit: itemsPerPage,
      totalPages
    };
  }, [paginateArray, totalItems, currentPage, itemsPerPage, totalPages]);

  return {
    // Current state
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    hasNextPage,
    hasPreviousPage,

    // Navigation functions
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    changeItemsPerPage,

    // Utility functions
    getPageNumbers,
    paginateArray,
    getPaginationParams,
    createPaginatedResponse,

    // Pagination info
    info: {
      showing: `${startIndex + 1}-${endIndex} of ${totalItems}`,
      page: `Page ${currentPage} of ${totalPages}`
    }
  };
}