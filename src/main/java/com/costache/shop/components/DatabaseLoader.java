package com.costache.shop.components;

import com.costache.shop.entities.Desktop;
import com.costache.shop.repositories.DesktopRepository;
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

    private final DesktopRepository desktopRepository;

    @Autowired
    public DatabaseLoader(DesktopRepository desktopRepository) {
//        this.employeeRepository = employeeRepository;
        this.desktopRepository = desktopRepository;
    }

    @Override
    public void run(String... strings) throws Exception {

//        this.employeeRepository.save(new Employee("Frodo", "Baggins", "ring bearer"));
//        this.employeeRepository.save(new Employee("Bilbo", "Baggins", "burglar"));
//        this.employeeRepository.save(new Employee("Gandalf", "the Grey", "wizard"));
//        this.employeeRepository.save(new Employee("Samwise", "Gamgee", "gardener"));
//        this.employeeRepository.save(new Employee("Meriadoc", "Brandybuck", "pony rider"));
//        this.employeeRepository.save(new Employee("Peregrin", "Took", "pipe smoker"));

        this.desktopRepository.save(new Desktop("Dell Optiplex", "i5 2400", "calculator office"));
        this.desktopRepository.save(new Desktop("HP Elite", "i3 2100", "calculator office"));
        this.desktopRepository.save(new Desktop("HP Compaq", "i3 3220", "calculator office"));
        this.desktopRepository.save(new Desktop("Dell Precision T3625", "i7 6700", "calculator office"));
        this.desktopRepository.save(new Desktop("Thinkcentre", "i5 4570", "calculator office"));

    }

}
