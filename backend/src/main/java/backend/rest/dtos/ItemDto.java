package backend.rest.dtos;

public class ItemDto {

    private Long id;
    private String itemName;
    private String referenceCode;
    private String barCode;
    private String manufacturerRef;
    private byte[] imgFile;
    private Long supplierId;

    public ItemDto() {
    }

    public ItemDto(Long id, String itemName, String referenceCode, String barCode, String manufacturerRef, byte[] imgFile, Long supplierId) {
        this.id = id;
        this.itemName = itemName;
        this.referenceCode = referenceCode;
        this.barCode = barCode;
        this.manufacturerRef = manufacturerRef;
        this.imgFile = imgFile;
        this.supplierId = supplierId;
    }

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

    public byte[] getImgFile() {
        return imgFile;
    }

    public void setImgFile(byte[] imgFile) {
        this.imgFile = imgFile;
    }

    public Long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
    }
}
