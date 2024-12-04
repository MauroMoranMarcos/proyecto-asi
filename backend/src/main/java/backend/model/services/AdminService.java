package backend.model.services;

import backend.model.entities.Warehouse;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;
import backend.model.exceptions.WarehouseAlreadyExistsException;

import java.util.List;

public interface AdminService {

    Long createWarehouse(Long userId, String name) throws PermissionException, InstanceNotFoundException, WarehouseAlreadyExistsException;

    List<Warehouse> findAllWarehouses();

}
