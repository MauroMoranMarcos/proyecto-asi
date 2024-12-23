package backend.model.services;

import backend.model.entities.Item;
import backend.model.entities.ItemBox;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;

import java.util.List;

public interface ItemsService {

    Item createItem(Long userId, String itemName, String referenceCode, String barCode, String manufacturerRef,
                    String supplier, byte[] imgFile) throws PermissionException, InstanceNotFoundException;

    Long addItemBoxToWarehouse(Long userId, Long itemId, Long numItems, String warehouseName)
            throws PermissionException, InstanceNotFoundException;

    Block<Item> checkInventory(Long userId, String keywords, int page, int size) throws PermissionException, InstanceNotFoundException;

    Item findItemById(Long userId, Long itemId) throws PermissionException, InstanceNotFoundException;

    Long countNumBoxesOfItemId(Long userId, Long itemId) throws PermissionException, InstanceNotFoundException;

    List<ItemBox> findAllBoxesOfItemId(Long userId, Long itemId) throws PermissionException, InstanceNotFoundException;

    Boolean deleteItem(Long userId, Long itemId) throws PermissionException, InstanceNotFoundException;

    Long modifyItem(Long userId, Long itemId, String itemName, String referenceCode, String barCode,
                    String manufacturerRef, String supplier, byte[] imgFile)
            throws PermissionException, InstanceNotFoundException;

    Long modifyItemBox(Long userId, Long itemBoxId, Long numItems, String warehouseName)
            throws PermissionException, InstanceNotFoundException;

    Boolean deleteItemBox(Long userId, Long itemBoxId) throws PermissionException, InstanceNotFoundException;

}
