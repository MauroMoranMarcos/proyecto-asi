package backend.rest.dtos;

import backend.model.entities.Order;

import java.util.List;
import java.util.stream.Collectors;

public class OrderConversor {

    private OrderConversor() {}

    public final static OrderDto toOrderDto(Order order) {
        return new OrderDto(order.getId(), order.getState());
    }

    public final static List<OrderDto> toOrderDtos(List<Order> orders) {

        return orders.stream().map(u -> toOrderDto(u)).collect(Collectors.toList());

    }
}
