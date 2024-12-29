package backend.model.entities;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "`Order`")
public class Order {

    private Long id;
    private Date orderDate;
    private Short state;
    private List<OrderBox> boxes = new ArrayList<>();

    public Order() {}

    public Order(Short state) {
        this.state = state;
    }

    public Order(Long id, Date orderDate, Short state, List<OrderBox> boxes) {
        this.id = id;
        this.orderDate = orderDate;
        this.state = state;
        this.boxes = boxes;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Short getState() {
        return state;
    }

    public void setState(Short state) {
        this.state = state;
    }

    @OneToMany(mappedBy = "order")
    public List<OrderBox> getBoxes() {
        return boxes;
    }

    public void setBoxes(List<OrderBox> boxes) {
        this.boxes = boxes;
    }
}
