package backend.rest.dtos;

import backend.model.entities.Supplier;

import java.util.List;
import java.util.stream.Collectors;

public class SupplierConversor {

    private SupplierConversor() {}

    public final static SupplierDto toSupplierDto(Supplier supplier) {
        return new SupplierDto(supplier.getId(), supplier.getName());
    }

    public final static List<SupplierDto> toSupplierDtos(List<Supplier> items) {

        return items.stream().map(u -> toSupplierDto(u)).collect(Collectors.toList());

    }

}
