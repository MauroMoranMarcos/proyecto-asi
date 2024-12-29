package backend.rest.dtos;

public class OrderBoxDto {

    private Long id;
    private Long orderId;
    private Long itemId;
    private String itemName;
    private int numBoxes;
    private int numItemsInBox;

    public OrderBoxDto() {}

    public OrderBoxDto(Long id, Long orderId, Long itemId, String itemName, int numBoxes, int numItemsInBox) {
        this.id = id;
        this.orderId = orderId;
        this.itemId = itemId;
        this.itemName = itemName;
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

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
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
