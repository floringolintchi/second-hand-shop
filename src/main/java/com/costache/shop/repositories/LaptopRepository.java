package com.costache.shop.repositories;

import com.costache.shop.entities.Laptop;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface LaptopRepository extends PagingAndSortingRepository<Laptop, Long> {
}
