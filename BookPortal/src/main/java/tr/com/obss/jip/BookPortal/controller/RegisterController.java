package tr.com.obss.jip.BookPortal.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tr.com.obss.jip.BookPortal.dto.UserDTO;
import tr.com.obss.jip.BookPortal.entity.User;
import tr.com.obss.jip.BookPortal.service.AdminService;
import tr.com.obss.jip.BookPortal.service.UserService;

import javax.validation.Valid;

@RestController
@RequestMapping("/register")
public class RegisterController {
    // --> Constructor injection
    private final UserService userService;

    public RegisterController(UserService userService) {
        this.userService = userService;
    }
    // --> Constructor injection

    @PostMapping // post isteğini karşılar (kayıt işlemini yapar)
    public ResponseEntity<UserDTO> addUser(@Valid @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.register(userDTO));
    }


}
