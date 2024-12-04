package backend.rest.dtos;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class WarehouseDto {

    private Long id;
    private String name;

    public WarehouseDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @NotNull
    @Size(min=1, max=60)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
