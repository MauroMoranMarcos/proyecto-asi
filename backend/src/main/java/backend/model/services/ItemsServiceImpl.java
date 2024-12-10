package backend.model.services;

import backend.model.entities.*;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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

    @Override
    public Block<ItemBox> checkInventory(Long userId, int page, int size) throws PermissionException,
            InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Slice<ItemBox> slice = itemBoxDao.findItems(page, size);

        return new Block<>(slice.getContent(), slice.hasNext());

    }

    @Override
    public ItemBox findItemBoxById(Long userId, Long itemBoxId) throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<ItemBox> itemBoxOpt = itemBoxDao.findById(itemBoxId);

        if (!itemBoxOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.itemBox", itemBoxId);
        }

        return itemBoxOpt.get();

    }

    @Override
    public Long countNumBoxesOfItemBoxId(Long userId, Long itemBoxId) throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<ItemBox> itemBoxOpt = itemBoxDao.findById(itemBoxId);

        if (!itemBoxOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.itemBox", itemBoxId);
        }

        return itemBoxDao.countByItemName(itemBoxOpt.get().getItemName());

    }

    @Override
    public List<ItemBox> findAllBoxesOfItemBoxId(Long userId, Long itemBoxId) throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<ItemBox> itemBoxOpt = itemBoxDao.findById(itemBoxId);

        if (!itemBoxOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.itemBox", itemBoxId);
        }

        return itemBoxDao.findByItemName(itemBoxOpt.get().getItemName());

    }

    @Override
    public Boolean deleteItem(Long userId, Long itemBoxId) throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<ItemBox> itemBoxOpt = itemBoxDao.findById(itemBoxId);

        if (!itemBoxOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.itemBox", itemBoxId);
        }

        List<ItemBox> itemBoxes = itemBoxDao.findByItemName(itemBoxOpt.get().getItemName());

        itemBoxDao.deleteAll(itemBoxes);

        return !itemBoxDao.existsByItemName(itemBoxOpt.get().getItemName());

    }

    /*
    Modifica la información de un item, de todas las cajas.
     */
    @Override
    public Long modifyItem(Long userId, Long itemBoxId, String itemName, String referenceCode, String barCode,
                           String manufacturerRef, String supplier, byte[] imgFile)
            throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<ItemBox> itemBoxOpt = itemBoxDao.findById(itemBoxId);

        if (!itemBoxOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.itemBox", itemBoxId);
        }

        List<ItemBox> itemBoxes = itemBoxDao.findByItemName(itemBoxOpt.get().getItemName());

        for (ItemBox itemBox : itemBoxes) {
            itemBox.setItemName(itemName);
            itemBox.setReferenceCode(referenceCode);
            itemBox.setBarCode(barCode);
            itemBox.setManufacturerRef(manufacturerRef);
            itemBox.setSupplier(supplier);
            itemBox.setImgFile(imgFile);
        }

        return itemBoxOpt.get().getId();

    }

    /*
    Modifica la información de una caja determinada, la cantidad de objetos que contiene.
     */
    @Override
    public Long modifyItemBox(Long userId, Long itemBoxId, Long numItems, String warehouseName)
            throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<ItemBox> itemBoxOpt = itemBoxDao.findById(itemBoxId);

        if (!itemBoxOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.itemBox", itemBoxId);
        }

        Optional<Warehouse> warehouseOpt = warehouseDao.findByName(warehouseName);

        if (!warehouseOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.warehouse", warehouseName);
        }

        ItemBox itemBox = itemBoxOpt.get();

        Warehouse warehouse = warehouseOpt.get();

        itemBox.setNumItems(numItems);
        itemBox.setWarehouse(warehouse);

        return itemBox.getId();

    }

    /*
    Elimina una caja determinada.
     */
    @Override
    public Boolean deleteItemBox(Long userId, Long itemBoxId) throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<ItemBox> itemBoxOpt = itemBoxDao.findById(itemBoxId);

        if (!itemBoxOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.itemBox", itemBoxId);
        }

        itemBoxDao.delete(itemBoxOpt.get());

        return !itemBoxDao.existsById(itemBoxId);

    }

}
