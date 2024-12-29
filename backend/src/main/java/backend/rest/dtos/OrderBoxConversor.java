package backend.rest.dtos;

import backend.model.entities.Item;
import backend.model.entities.OrderBox;

import java.util.List;
import java.util.stream.Collectors;

public class OrderBoxConversor {

    private OrderBoxConversor() {}

    public final static OrderBoxDto toOrderBoxDto(OrderBox orderBox) {
        return new OrderBoxDto(orderBox.getId(), orderBox.getOrder().getId(), orderBox.getItem().getId(),
                orderBox.getNumBoxes(), orderBox.getNumItemsInBox());
    }

    public final static List<OrderBoxDto> toOrderBoxDtos(List<OrderBox> orderBoxes) {

        return orderBoxes.stream().map(u -> toOrderBoxDto(u)).collect(Collectors.toList());

    }
}
