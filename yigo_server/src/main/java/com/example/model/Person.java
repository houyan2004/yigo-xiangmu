package com.example.model;


import lombok.Data;

@Data
public class Person {
    private String id;
    private String name;
    private String age;

    public Person(String name, String age){
        this.name=name;
        this.age=age;
    }
}
