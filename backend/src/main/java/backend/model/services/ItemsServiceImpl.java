package backend.model.services;

import backend.model.entities.*;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class ItemsServiceImpl implements ItemsService {

    @Autowired
    private PermissionChecker permissionChecker;

    @Autowired
    private WarehouseDao warehouseDao;

    @Autowired
    private ItemBoxDao itemBoxDao;

    @Override
    public Long addItemBoxToWarehouse(Long userId, String itemName, String referenceCode, Long numItems,
                                      String barCode, String manufacturerRef, String supplier, byte[] imgFile,
                                      String warehouseName)
            throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<Warehouse> warehouseOpt = warehouseDao.findByName(warehouseName);

        if (!warehouseOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.warehouse", warehouseName);
        }

        ItemBox itemBox = new ItemBox(itemName, numItems, referenceCode, barCode, manufacturerRef, supplier, imgFile, warehouseOpt.get());
        itemBoxDao.save(itemBox);

        return itemBox.getId();

    }

}
