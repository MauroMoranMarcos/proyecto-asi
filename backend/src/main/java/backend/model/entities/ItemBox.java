package backend.model.entities;

import javax.persistence.*;

@Entity
public class ItemBox {

    private Long id;
    private String itemName;
    private Long numItems;
    private String referenceCode;
    private String barCode;
    private String manufacturerRef;
    private String supplier;
    private byte[] imgFile;
    private Warehouse warehouse;

    public ItemBox() {
    }

    public ItemBox(String itemName, Long numItems, String referenceCode, String barCode, String manufacturerRef, String supplier, byte[] imgFile, Warehouse warehouse) {
        this.itemName = itemName;
        this.numItems = numItems;
        this.referenceCode = referenceCode;
        this.barCode = barCode;
        this.manufacturerRef = manufacturerRef;
        this.supplier = supplier;
        this.imgFile = imgFile;
        this.warehouse = warehouse;
    }

    public ItemBox(Long id, String itemName, Long numItems, String referenceCode, String barCode, String manufacturerRef, String supplier, byte[] imgFile, Warehouse warehouse) {
        this.id = id;
        this.itemName = itemName;
        this.numItems = numItems;
        this.referenceCode = referenceCode;
        this.barCode = barCode;
        this.manufacturerRef = manufacturerRef;
        this.supplier = supplier;
        this.imgFile = imgFile;
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

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Long getNumItems() {
        return numItems;
    }

    public void setNumItems(Long numItems) {
        this.numItems = numItems;
    }

    public String getReferenceCode() {
        return referenceCode;
    }

    public void setReferenceCode(String referenceCode) {
        this.referenceCode = referenceCode;
    }

    public String getBarCode() {
        return barCode;
    }

    public void setBarCode(String barCode) {
        this.barCode = barCode;
    }

    public String getManufacturerRef() {
        return manufacturerRef;
    }

    public void setManufacturerRef(String manufacturerRef) {
        this.manufacturerRef = manufacturerRef;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public byte[] getImgFile() {
        return imgFile;
    }

    public void setImgFile(byte[] imgFile) {
        this.imgFile = imgFile;
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
