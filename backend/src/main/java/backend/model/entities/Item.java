package backend.model.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Item {
    private Long id;
    private String itemName;
    private String referenceCode;
    private String barCode;
    private String manufacturerRef;
    private String supplier;
    private byte[] imgFile;

    public Item() {
    }

    public Item(Long id, String itemName, String referenceCode, String barCode, String manufacturerRef, String supplier, byte[] imgFile) {
        this.id = id;
        this.itemName = itemName;
        this.referenceCode = referenceCode;
        this.barCode = barCode;
        this.manufacturerRef = manufacturerRef;
        this.supplier = supplier;
        this.imgFile = imgFile;
    }

    public Item(String itemName, String referenceCode, String barCode, String manufacturerRef, String supplier, byte[] imgFile) {
        this.itemName = itemName;
        this.referenceCode = referenceCode;
        this.barCode = barCode;
        this.manufacturerRef = manufacturerRef;
        this.supplier = supplier;
        this.imgFile = imgFile;
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
}
