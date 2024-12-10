package backend.rest.dtos;

import backend.model.entities.Warehouse;

public class ItemBoxDto {

    private Long id;
    private Long numItems;
    private Long itemId;
    private Long warehouseId;

    public ItemBoxDto() {
    }

    public ItemBoxDto(Long id, Long numItems, Long itemId, Long warehouseId) {
        this.id = id;
        this.numItems = numItems;
        this.itemId = itemId;
        this.warehouseId = warehouseId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNumItems() {
        return numItems;
    }

    public void setNumItems(Long numItems) {
        this.numItems = numItems;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public Long getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Long warehouseId) {
        this.warehouseId = warehouseId;
    }
}
