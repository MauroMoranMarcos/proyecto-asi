package backend.model.services;

import backend.model.entities.User;
import backend.model.entities.UserDao;
import backend.model.entities.Warehouse;
import backend.model.entities.WarehouseDao;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;
import backend.model.exceptions.WarehouseAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private WarehouseDao warehouseDao;

    @Autowired
    private PermissionChecker permissionChecker;

    @Override
    public Long createWarehouse(Long userId, String name)
            throws PermissionException, InstanceNotFoundException, WarehouseAlreadyExistsException {

        User admin = permissionChecker.checkUser(userId);

        if (!admin.getRole().equals(User.RoleType.ADMIN_STAFF)) {
            throw new PermissionException();
        }

        if (warehouseDao.existsByName(name)) {
            throw new WarehouseAlreadyExistsException();
        }

        Warehouse warehouse = new Warehouse(name);
        warehouseDao.save(warehouse);

        return warehouse.getId();

    }

    @Override
    public List<Warehouse> findAllWarehouses() {

        Iterable<Warehouse> warehouses = warehouseDao.findAll();
        List<Warehouse> warehousesAsList = new ArrayList<>();

        warehouses.forEach(w -> warehousesAsList.add(w));

        return warehousesAsList;

    }
}
