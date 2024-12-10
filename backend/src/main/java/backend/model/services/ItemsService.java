package backend.model.services;

import backend.model.entities.ItemBox;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;

import java.util.List;

public interface ItemsService {

    Long addItemBoxToWarehouse(Long userId, String itemName, String referenceCode, Long numItems, String barCode,
                               String manufacturerRef, String supplier, byte[] imgFile, String warehouseName)
            throws PermissionException, InstanceNotFoundException;

    Block<ItemBox> checkInventory(Long userId, int page, int size) throws PermissionException, InstanceNotFoundException;

    ItemBox findItemBoxById(Long userId, Long itemBoxId) throws PermissionException, InstanceNotFoundException;

    Long countNumBoxesOfItemBoxId(Long userId, Long itemBoxId) throws PermissionException, InstanceNotFoundException;

    List<ItemBox> findAllBoxesOfItemBoxId(Long userId, Long itemBoxId) throws PermissionException, InstanceNotFoundException;

    Boolean deleteItem(Long userId, Long itemBoxId) throws PermissionException, InstanceNotFoundException;

}
