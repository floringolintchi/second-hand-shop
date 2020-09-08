package com.costache.shop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class HomeController {

    @RequestMapping("/calculatoare")
    void handleFoo(HttpServletResponse response) throws IOException {
        response.sendRedirect("http://localhost:3006/");
    }

    @RequestMapping(value = "/")
    public String home() {
        return "home";
    }

//    @RequestMapping(value = "/calculatoare")
//    public String index() {
//        return "index";
//    }

    @RequestMapping(value = "/home")
    public String returnHome() { return "home"; }

    @RequestMapping(value = "/contact")
    public String contact() { return "contact"; }

    @RequestMapping(value = "/ghiduri")
    public String ghiduri() { return "ghiduri"; }

}