package backend.model.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class OrderBox {

    private Long id;
    private Order order;
    private ItemBox box;
    private Long numBoxes;

    public OrderBox() {}

    public OrderBox(Order order, ItemBox box, Long numBoxes) {
        this.order = order;
        this.box = box;
        this.numBoxes = numBoxes;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public ItemBox getBox() {
        return box;
    }

    public void setBox(ItemBox box) {
        this.box = box;
    }

    public Long getNumBoxes() {
        return numBoxes;
    }

    public void setNumBoxes(Long numBoxes) {
        this.numBoxes = numBoxes;
    }
}
