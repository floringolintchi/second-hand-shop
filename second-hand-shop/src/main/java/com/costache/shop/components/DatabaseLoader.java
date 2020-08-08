package com.costache.shop.components;

import com.costache.shop.entities.RegisteredUser;
import com.costache.shop.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepository repository;

    @Autowired
    public DatabaseLoader(UserRepository repository){
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new RegisteredUser("marcel1234","Ion Marcel","marcel","ionmarcel@gmail.com","Str Cosbuc Bl B1 ap 21"));
    }
}
