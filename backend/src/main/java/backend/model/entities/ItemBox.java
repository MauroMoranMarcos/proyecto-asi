package backend.model.entities;

import javax.persistence.*;

@Entity
public class ItemBox {

    private Long id;
    private Long numItems;
    private Long currentNumItems;
    private Item item;
    private Warehouse warehouse;

    public ItemBox() {
    }

    public ItemBox(Long id, Long numItems, Item item, Warehouse warehouse) {
        this.id = id;
        this.numItems = numItems;
        this.item = item;
        this.warehouse = warehouse;
    }

    public ItemBox(Long numItems, Item item, Warehouse warehouse) {
        this.numItems = numItems;
        this.currentNumItems = numItems;
        this.item = item;
        this.warehouse = warehouse;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public Long getCurrentNumItems() {
        return currentNumItems;
    }

    public void setCurrentNumItems(Long currentNumItems) {
        this.currentNumItems = currentNumItems;
    }

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "itemId")
    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouseId")
    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }
}
