package backend.rest.controllers;

import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;
import backend.model.services.OrderService;
import backend.rest.dtos.OrderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import static backend.rest.dtos.OrderConversor.toOrderDto;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/createOrder")
    private OrderDto createOrder(@RequestAttribute Long userId)
            throws IOException, PermissionException, InstanceNotFoundException {

        return toOrderDto(orderService.createOrder(userId));

    }
}
