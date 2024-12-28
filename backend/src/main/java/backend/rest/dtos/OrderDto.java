package backend.rest.dtos;

import java.util.Date;

public class OrderDto {

    private Long id;
    private Date orderDate;
    private Short state;

    public OrderDto() {}

    public OrderDto(Long id, Short state) {
        this.id = id;
        this.state = state;
    }

    public OrderDto(Long id, Date orderDate, Short state) {
        this.id = id;
        this.orderDate = orderDate;
        this.state = state;
    }

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
}
