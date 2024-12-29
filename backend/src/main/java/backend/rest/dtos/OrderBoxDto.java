package backend.rest.dtos;

public class OrderBoxDto {

    private Long id;
    private Long orderId;
    private Long itemId;
    private int numBoxes;
    private int numItemsInBox;

    public OrderBoxDto() {}

    public OrderBoxDto(Long id, Long orderId, Long itemId, int numBoxes, int numItemsInBox) {
        this.id = id;
        this.orderId = orderId;
        this.itemId = itemId;
        this.numBoxes = numBoxes;
        this.numItemsInBox = numItemsInBox;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
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
