package com.costache.shop.repositories;

import com.costache.shop.entities.RegisteredUsers;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<RegisteredUsers, Integer> {
}
