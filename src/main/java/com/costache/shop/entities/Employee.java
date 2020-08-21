//package com.costache.shop.entities;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import lombok.*;
//
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//import javax.persistence.Version;
//import java.util.Objects;
//
//@Data
//@Entity
//public class Employee {
//
//    private @Id
//    @GeneratedValue
//    Long id;
//    private String firstName;
//    private String lastName;
//    private String description;
//
//    private @Version
//    @JsonIgnore
//    Long version;
//
//    private Employee() {
//    }
//
//    public Employee(String firstName, String lastName, String description) {
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.description = description;
//    }
//
//}