package backend.rest.dtos;

import backend.model.entities.Order;

import java.util.List;
import java.util.stream.Collectors;

public class OrderConversor {

    private OrderConversor() {}

    public final static OrderDto toOrderDto(Order order) {
        return new OrderDto(order.getId(), order.getState());
    }

    public final static OrderDto toOrderWithDateDto(Order order) {
        return new OrderDto(order.getId(), order.getOrderDate(), order.getState());
    }

    public final static List<OrderDto> toOrderDtos(List<Order> orders) {

        return orders.stream().map(u -> toOrderDto(u)).collect(Collectors.toList());

    }

    public final static List<OrderDto> toOrderWithDateDtos(List<Order> orders) {

        return orders.stream().map(u -> toOrderWithDateDto(u)).collect(Collectors.toList());

    }
}
