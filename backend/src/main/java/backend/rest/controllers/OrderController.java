package backend.rest.controllers;

import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;
import backend.model.services.OrderService;
import backend.rest.dtos.OrderBoxDto;
import backend.rest.dtos.OrderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static backend.rest.dtos.OrderBoxConversor.toOrderBoxDto;
import static backend.rest.dtos.OrderBoxConversor.toOrderBoxDtos;
import static backend.rest.dtos.OrderConversor.toOrderDto;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/createOrder")
    public OrderDto createOrder(@RequestAttribute Long userId)
            throws PermissionException, InstanceNotFoundException {

        return toOrderDto(orderService.createOrder(userId));

    }

    @PostMapping("/{orderId}/addBox")
    public List<OrderBoxDto> addBoxToOrder(@RequestAttribute Long userId, @PathVariable Long orderId,
                                           @RequestParam Long itemId, @RequestParam int numBoxes,
                                           @RequestParam int numItemsInBox)
            throws PermissionException, InstanceNotFoundException {

        return toOrderBoxDtos(orderService.addBoxToOrder(userId, orderId, itemId, numBoxes, numItemsInBox));

    }

    @PutMapping("/{orderId}/box/{boxId}/updateNumBoxes")
    public List<OrderBoxDto> updateNumBoxesInOrder(@RequestAttribute Long userId, @PathVariable Long orderId,
                                             @PathVariable Long boxId, @RequestParam int newNumberOfBoxes)
            throws PermissionException, InstanceNotFoundException {

        return toOrderBoxDtos(orderService.updateNumberOfBoxesInOrder(userId, orderId, boxId, newNumberOfBoxes));

    }

    @PostMapping("/{orderId}/box/{boxId}/delete")
    public List<OrderBoxDto> deleteBoxInOrder(@RequestAttribute Long userId, @PathVariable Long orderId, @PathVariable Long boxId)
            throws PermissionException, InstanceNotFoundException {

        return toOrderBoxDtos(orderService.removeBoxFromOrder(userId, orderId, boxId));

    }
}
