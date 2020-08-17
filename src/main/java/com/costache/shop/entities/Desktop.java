package com.costache.shop.entities;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Desktop {

    private @Id
    @GeneratedValue
    Long id;

    private String nume;
    private String procesor;
    private String descriere;

    private Desktop(){}

    public Desktop(String nume, String procesor, String descriere){
        this.nume = nume;
        this.procesor = procesor;
        this.descriere = descriere;
    }




}
