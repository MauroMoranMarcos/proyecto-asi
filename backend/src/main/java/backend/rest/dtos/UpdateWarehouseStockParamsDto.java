package backend.rest.dtos;

import javax.validation.constraints.NotNull;

public class UpdateWarehouseStockParamsDto {

    private String warehouseName;

    @NotNull
    public String getWarehouseName() {
        return warehouseName;
    }

    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }
}
