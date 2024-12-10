package backend.rest.dtos;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

public class AddItemBoxToWarehouseParamsDto {

    private Long numItems;
    private String warehouseName;

    @NotNull
    public Long getNumItems() {
        return numItems;
    }

    public void setNumItems(Long numItems) {
        this.numItems = numItems;
    }

    @NotNull
    public String getWarehouseName() {
        return warehouseName;
    }

    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }
}