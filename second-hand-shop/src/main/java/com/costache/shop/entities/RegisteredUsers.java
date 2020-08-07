package com.costache.shop.entities;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class RegisteredUsers {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String password;
    private String nume;
    private String username;
    private String adresaEmail;
    private String adresa;

    private RegisteredUsers() {}

    public RegisteredUsers(String password, String nume, String username, String adresaEmail, String adresa) {
        this.password = password;
        this.nume = nume;
        this.username = username;
        this.adresaEmail = adresaEmail;
        this.adresa = adresa;
    }
}
