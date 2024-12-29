package backend.model.entities;

import javax.persistence.*;

@Entity
public class OrderBox {

    private Long id;
    private Order order;
    private Item item;
    private int numBoxes;
    private int numItemsInBox;

    public OrderBox() {}

    public OrderBox(Order order, Item item, int numBoxes, int numItemsInBox) {
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

    public int getNumBoxes() {
        return numBoxes;
    }

    public void setNumBoxes(int numBoxes) {
        this.numBoxes = numBoxes;
    }

    public int getNumItemsInBox() {
        return numItemsInBox;
    }

    public void setNumItemsInBox(int numItemsInBox) {
        this.numItemsInBox = numItemsInBox;
    }
}
