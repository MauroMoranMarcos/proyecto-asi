package backend.rest.dtos;

import backend.model.entities.Warehouse;

import java.util.List;
import java.util.stream.Collectors;

public class WarehouseConversor {

    private WarehouseConversor() {}

    public final static WarehouseDto toWarehouseDto(Warehouse warehouse) {
        return new WarehouseDto(warehouse.getId(), warehouse.getName());
    }

    public final static Warehouse toWarehouse(WarehouseDto warehouseDto) {

        return new Warehouse(warehouseDto.getId(), warehouseDto.getName());
    }

    public final static List<WarehouseDto> toWarehouseDtos(List<Warehouse> warehouses) {

        return warehouses.stream().map(u -> toWarehouseDto(u)).collect(Collectors.toList());

    }

}
