package backend.model.services;

import backend.model.entities.Item;
import backend.model.entities.ItemBox;
import backend.model.entities.Supplier;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.InvalidNumberOfItemsToAddToBox;
import backend.model.exceptions.InvalidNumberOfItemsToRemoveFromBox;
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

    Long addItemsToBox(Long userId, Long itemBoxId, Long numItemsToAdd)
            throws PermissionException, InstanceNotFoundException, InvalidNumberOfItemsToAddToBox;

    Long removeItemsFromBox(Long userId, Long itemBoxId, Long numItemsToRemove)
            throws PermissionException, InstanceNotFoundException, InvalidNumberOfItemsToRemoveFromBox;

    Boolean deleteItemBox(Long userId, Long itemBoxId) throws PermissionException, InstanceNotFoundException;

    Supplier createSupplier(String supplierName);

    List<Supplier> findAllSuppliers();

    Block<Item> findItemsFromSupplier(Long supplierId, int page, int size) throws InstanceNotFoundException;

    Supplier findSupplierById(Long supplierId) throws InstanceNotFoundException;

    List<Item> findAllItems();

}
