package com.costache.shop.components;

import com.costache.shop.entities.Employee;
import com.costache.shop.entities.RegisteredUser;
import com.costache.shop.repositories.EmployeeRepository;
import com.costache.shop.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

//    private final UserRepository repository;
//
//    @Autowired
//    public DatabaseLoader(UserRepository repository){
//        this.repository = repository;
//    }
//
//    @Override
//    public void run(String... strings) throws Exception {
//        this.repository.save(new RegisteredUser("marcel1234","Ion Marcel","marcel","ionmarcel@gmail.com","Str Cosbuc Bl B1 ap 21"));
//    }

    private final EmployeeRepository repository;

    @Autowired
    public DatabaseLoader(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {

        this.repository.save(new Employee("Frodo", "Baggins", "ring bearer"));
        this.repository.save(new Employee("Bilbo", "Baggins", "burglar"));
        this.repository.save(new Employee("Gandalf", "the Grey", "wizard"));
        this.repository.save(new Employee("Samwise", "Gamgee", "gardener"));
        this.repository.save(new Employee("Meriadoc", "Brandybuck", "pony rider"));
        this.repository.save(new Employee("Peregrin", "Took", "pipe smoker"));    }

}
