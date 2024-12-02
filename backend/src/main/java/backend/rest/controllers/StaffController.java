package backend.rest.controllers;

import backend.model.entities.User;
import backend.model.exceptions.DuplicateInstanceException;
import backend.model.services.StaffService;
import backend.rest.common.JwtGenerator;
import backend.rest.common.JwtInfo;
import backend.rest.dtos.AuthenticatedUserDto;
import backend.rest.dtos.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

import static backend.rest.dtos.UserConversor.toAuthenticatedUserDto;
import static backend.rest.dtos.UserConversor.toUser;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/staff")
public class StaffController {

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private JwtGenerator jwtGenerator;

    @Autowired
    private StaffService staffService;

    @PostMapping("/signUp")
    public ResponseEntity<AuthenticatedUserDto> signUp(
            @Validated({UserDto.AllValidations.class}) @RequestBody UserDto userDto)
            throws DuplicateInstanceException {

        User user = toUser(userDto);

        staffService.signUp(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(user.getId()).toUri();

        return ResponseEntity.created(location).body(toAuthenticatedUserDto(generateServiceToken(user), user));

    }

    private String generateServiceToken(User user) {

        JwtInfo jwtInfo = new JwtInfo(user.getId(), user.getUserName(), user.getRole().toString());

        return jwtGenerator.generate(jwtInfo);

    }
}
