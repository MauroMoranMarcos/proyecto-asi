package backend.rest.dtos;

import backend.model.entities.Item;

import java.util.List;
import java.util.stream.Collectors;

public class ItemConversor {

    private ItemConversor() {}

    public final static ItemDto toItemDto(Item item) {
        return new ItemDto(item.getId(), item.getItemName(), item.getReferenceCode(),
                item.getBarCode(), item.getManufacturerRef(), item.getSupplier(), item.getImgFile());
    }

    public final static List<ItemDto> toItemDtos(List<Item> items) {

        return items.stream().map(u -> toItemDto(u)).collect(Collectors.toList());

    }

}
