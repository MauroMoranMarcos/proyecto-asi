package backend.rest.controllers;

import backend.model.entities.Item;
import backend.model.entities.Order;
import backend.model.entities.OrderBox;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;
import backend.model.services.Block;
import backend.model.services.OrderService;
import backend.rest.dtos.BlockDto;
import backend.rest.dtos.OrderBoxDto;
import backend.rest.dtos.OrderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static backend.rest.dtos.ItemConversor.toItemDtos;
import static backend.rest.dtos.OrderBoxConversor.toOrderBoxDto;
import static backend.rest.dtos.OrderBoxConversor.toOrderBoxDtos;
import static backend.rest.dtos.OrderConversor.toOrderDto;
import static backend.rest.dtos.OrderConversor.toOrderDtos;

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

    @GetMapping("/findOrderDrafts")
    public BlockDto<OrderDto> findOrderDrafts(@RequestAttribute Long userId, @RequestParam(defaultValue = "0") int page)
            throws PermissionException, InstanceNotFoundException {

        Block<Order> orderBlock = orderService.findOrderDrafts(userId, page, 12);

        return new BlockDto<>(toOrderDtos(orderBlock.getItems()), orderBlock.getExistMoreItems());

    }

    @GetMapping("/{id}")
    public OrderDto findOrderById(@RequestAttribute Long userId, @PathVariable Long id)
            throws PermissionException, InstanceNotFoundException {

        return toOrderDto(orderService.findOrderById(userId, id));

    }

    @GetMapping("/{id}/boxes")
    public List<OrderBoxDto> findOrderBoxesById(@RequestAttribute Long userId, @PathVariable Long id)
            throws PermissionException, InstanceNotFoundException {

        return toOrderBoxDtos(orderService.findOrderBoxesById(userId, id));

    }

    @PutMapping("/{orderId}/boxes/{boxId}/updateNumBoxes")
    public List<OrderBoxDto> updateNumBoxesInOrder(@RequestAttribute Long userId, @PathVariable Long orderId,
                                             @PathVariable Long boxId, @RequestParam int newNumberOfBoxes)
            throws PermissionException, InstanceNotFoundException {

        return toOrderBoxDtos(orderService.updateNumberOfBoxesInOrder(userId, orderId, boxId, newNumberOfBoxes));

    }

    @PostMapping("/{orderId}/boxes/{boxId}/delete")
    public List<OrderBoxDto> deleteBoxInOrder(@RequestAttribute Long userId, @PathVariable Long orderId, @PathVariable Long boxId)
            throws PermissionException, InstanceNotFoundException {

        return toOrderBoxDtos(orderService.removeBoxFromOrder(userId, orderId, boxId));

    }
}
