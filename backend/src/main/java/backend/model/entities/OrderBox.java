package backend.model.entities;

import javax.persistence.*;

@Entity
public class OrderBox {

    private Long id;
    private Order order;
    private Item item;
    private Long numBoxes;
    private Long numItemsInBox;

    public OrderBox() {}

    public OrderBox(Order order, Item item, Long numBoxes, Long numItemsInBox) {
        this.order = order;
        this.item = item;
        this.numBoxes = numBoxes;
        this.numItemsInBox = numItemsInBox;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "orderId")
    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "itemId")
    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Long getNumBoxes() {
        return numBoxes;
    }

    public void setNumBoxes(Long numBoxes) {
        this.numBoxes = numBoxes;
    }

    public Long getNumItemsInBox() {
        return numItemsInBox;
    }

    public void setNumItemsInBox(Long numItemsInBox) {
        this.numItemsInBox = numItemsInBox;
    }
}
