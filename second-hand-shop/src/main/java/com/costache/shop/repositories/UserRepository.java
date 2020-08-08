package com.costache.shop.repositories;

import com.costache.shop.entities.RegisteredUser;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<RegisteredUser, Integer> {
}
