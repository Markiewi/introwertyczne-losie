package com.agh.introwertycznelosie.config;

import com.agh.introwertycznelosie.data.Role;
import com.agh.introwertycznelosie.data.User;
import com.agh.introwertycznelosie.repositories.UserRepository;
import com.agh.introwertycznelosie.services.SecurityService;
import com.agh.introwertycznelosie.services.UserDetailsServiceImpl;
import com.agh.introwertycznelosie.services.UserService;
import org.hibernate.type.MetaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashSet;

@Controller
public class LoginController {
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;

    @GetMapping("/home")
    public String home() {
        return "home";
    }

    @RequestMapping(value = "/getCurrentUserRole", method = RequestMethod.GET)
    public String getRole() {
        UserDetails userDetails = securityService.findLoggedInUser();
        User user = userService.findByUsername(userDetails.getUsername());
        return user.getRoles().iterator().next().getName();
    }

    @RequestMapping(value = "/login", method = RequestMethod.PUT)
    public ResponseEntity<HttpStatus> index(@RequestBody User user) {
        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
            securityService.autoLogin(userDetails.getUsername(), user.getPassword());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found", e);
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @RequestMapping(value = "/register", method = RequestMethod.PUT)
    public ResponseEntity<HttpStatus> register(@RequestBody User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @RequestMapping(value = {"/*"}, method = RequestMethod.GET)
    public ModelAndView index() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("../static/index");
        return modelAndView;
    }
}
