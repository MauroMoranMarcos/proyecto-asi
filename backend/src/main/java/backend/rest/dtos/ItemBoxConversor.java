package backend.rest.dtos;

import backend.model.entities.ItemBox;

import java.util.List;
import java.util.stream.Collectors;

public class ItemBoxConversor {

    private ItemBoxConversor() {}

    public final static ItemBoxDto toItemBoxDto(ItemBox itemBox) {
        return new ItemBoxDto(itemBox.getId(), itemBox.getNumItems(), itemBox.getCurrentNumItems(), itemBox.getItem().getId(), itemBox.getWarehouse().getId());
    }

    public final static List<ItemBoxDto> toItemBoxDtos(List<ItemBox> itemBoxes) {

        return itemBoxes.stream().map(u -> toItemBoxDto(u)).collect(Collectors.toList());

    }
}
