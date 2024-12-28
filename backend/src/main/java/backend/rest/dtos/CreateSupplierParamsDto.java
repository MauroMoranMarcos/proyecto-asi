package backend.rest.dtos;

import javax.validation.constraints.NotNull;

public class CreateSupplierParamsDto {

    private String supplierName;

    @NotNull
    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }
}
