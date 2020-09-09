package com.costache.shop.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
//@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception
    {
       http
               .authorizeRequests()
                                    .antMatchers("/","/home","/contact","/ghiduri", "/public/static/**", "/public/img/**","/templates/**").permitAll()
                                    .anyRequest().authenticated()
                                    .and()
//                                    .httpBasic();
               .formLogin()
//                                    .loginPage()
                                    .permitAll()
                                    .and()
               .logout()
                                    .permitAll();
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/img/**");
    }

//    @Bean
//    @Override
//    public UserDetailsService userDetailsService() {
//        //possible to adapt this: https://stackoverflow.com/questions/49847791/java-spring-security-user-withdefaultpasswordencoder-is-deprecated
//        UserDetails user =
//                User.withDefaultPasswordEncoder()
//                    .username("user")
//                    .password("123")
//                    .roles("USER")
//                    .build();
//
//        return new InMemoryUserDetailsManager(user);
//
//    }

}