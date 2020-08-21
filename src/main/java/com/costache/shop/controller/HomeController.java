package com.costache.shop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping(value = "/")
    public String home() {
        return "home";
    }

    @RequestMapping(value = "/calculatoare")
    public String index() {
        return "index";
    }

    @RequestMapping(value = "/home")
    public String returnHome() { return "home"; }

    @RequestMapping(value = "/contact")
    public String contact() { return "contact"; }

}