package backend.model.services;

import backend.model.entities.*;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.InvalidNumberOfItemsToAddToBox;
import backend.model.exceptions.InvalidNumberOfItemsToRemoveFromBox;
import backend.model.exceptions.PermissionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    private ItemDao itemDao;

    @Autowired
    private ItemBoxDao itemBoxDao;

    @Autowired
    private SupplierDao supplierDao;

    @Override
    public Item createItem(Long userId, String itemName, String referenceCode, String barCode, String manufacturerRef,
                           String supplier, byte[] imgFile) throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<Supplier> supplierOpt = supplierDao.findByName(supplier);

        if (!supplierOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.supplier", supplier);
        }

        Item item = new Item(itemName, referenceCode, barCode, manufacturerRef, imgFile, supplierOpt.get());
        itemDao.save(item);

        return item;

    }

    @Override
    public Long addItemBoxToWarehouse(Long userId, Long itemId, Long numItems, String warehouseName)
            throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<Item> itemOpt = itemDao.findById(itemId);

        if (!itemOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.item", itemId);
        }

        Optional<Warehouse> warehouseOpt = warehouseDao.findByName(warehouseName);

        if (!warehouseOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.warehouse", warehouseName);
        }

        ItemBox itemBox = new ItemBox(numItems, itemOpt.get(), warehouseOpt.get());
        itemBoxDao.save(itemBox);

        return itemBox.getId();

    }

    @Override
    public Block<Item> checkInventory(Long userId, String keywords, int page, int size) throws PermissionException,
            InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Slice<Item> slice = itemDao.findItems(keywords, page, size);

        return new Block<>(slice.getContent(), slice.hasNext());

    }

    @Override
    public Item findItemById(Long userId, Long itemId) throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<Item> itemOpt = itemDao.findById(itemId);

        if (!itemOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.item", itemId);
        }

        return itemOpt.get();

    }

    @Override
    public Long countNumBoxesOfItemId(Long userId, Long itemId) throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<Item> itemOpt = itemDao.findById(itemId);

        if (!itemOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.item", itemId);
        }

        return itemBoxDao.countByItem(itemOpt.get());

    }

    @Override
    public List<ItemBox> findAllBoxesOfItemId(Long userId, Long itemId) throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<Item> itemOpt = itemDao.findById(itemId);

        if (!itemOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.item", itemId);
        }

        return itemBoxDao.findByItem(itemOpt.get());

    }

    @Override
    public Boolean deleteItem(Long userId, Long itemId) throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<Item> itemOpt = itemDao.findById(itemId);

        if (!itemOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.item", itemId);
        }

        Item item = itemOpt.get();

        itemDao.delete(item);

        return !itemDao.existsById(itemId);

    }

    /*
    Modifica la información de un item.
     */
    @Override
    public Long modifyItem(Long userId, Long itemId, String itemName, String referenceCode, String barCode,
                           String manufacturerRef, String supplier, byte[] imgFile)
            throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<Item> itemOpt = itemDao.findById(itemId);

        if (!itemOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.item", itemId);
        }

        Item item = itemOpt.get();

        Optional<Supplier> supplierOpt = supplierDao.findByName(supplier);

        if (!supplierOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.supplier", supplier);
        }

        item.setItemName(itemName);
        item.setReferenceCode(referenceCode);
        item.setBarCode(barCode);
        item.setManufacturerRef(manufacturerRef);
        item.setSupplier(supplierOpt.get());
        if (imgFile != null) {
            item.setImgFile(imgFile);
        }

        return item.getId();

    }

    /*
    Modifica la información de una caja de un item determinada, la cantidad de objetos que contiene.
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
    Añade una cantidad de items de una caja
     */
    @Override
    public Long addItemsToBox(Long userId, Long itemBoxId, Long numItemsToAdd)
            throws PermissionException, InstanceNotFoundException, InvalidNumberOfItemsToAddToBox {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<ItemBox> itemBoxOpt = itemBoxDao.findById(itemBoxId);

        if (!itemBoxOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.itemBox", itemBoxId);
        }

        ItemBox itemBox = itemBoxOpt.get();

        Long newCurrentNumItems = itemBox.getCurrentNumItems() + numItemsToAdd;

        if (newCurrentNumItems > itemBox.getNumItems()) {
            throw new InvalidNumberOfItemsToAddToBox();
        }

        itemBox.setCurrentNumItems(newCurrentNumItems);

        return itemBox.getId();

    }

    /*
    Elimina una cantidad de items de una caja
     */
    @Override
    public Long removeItemsFromBox(Long userId, Long itemBoxId, Long numItemsToRemove)
            throws PermissionException, InstanceNotFoundException, InvalidNumberOfItemsToRemoveFromBox {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<ItemBox> itemBoxOpt = itemBoxDao.findById(itemBoxId);

        if (!itemBoxOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.itemBox", itemBoxId);
        }

        ItemBox itemBox = itemBoxOpt.get();

        Long newCurrentNumItems = itemBox.getCurrentNumItems() - numItemsToRemove;

        if (newCurrentNumItems < 0) {
            throw new InvalidNumberOfItemsToRemoveFromBox();
        }

        itemBox.setCurrentNumItems(newCurrentNumItems);

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

    @Override
    public Supplier createSupplier(String supplierName) {

        Supplier supplier = new Supplier(supplierName);

        supplierDao.save(supplier);

        return supplier;

    }

    @Override
    public List<Supplier> findAllSuppliers() {

        Iterable<Supplier> suppliers = supplierDao.findAll();
        List<Supplier> suppliersAsList = new ArrayList<>();

        suppliers.forEach(s -> suppliersAsList.add(s));

        return suppliersAsList;

    }

    @Override
    public Block<Item> findItemsFromSupplier(Long supplierId, int page, int size) throws InstanceNotFoundException {

        Optional<Supplier> supplierOpt = supplierDao.findById(supplierId);

        if (!supplierOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.supplier", supplierId);
        }

        Slice<Item> slice = itemDao.findItemsBySupplier(supplierId, page, size);

        return new Block<>(slice.getContent(), slice.hasNext());

    }

    @Override
    public Supplier findSupplierById(Long supplierId) throws InstanceNotFoundException {

        Optional<Supplier> supplierOpt = supplierDao.findById(supplierId);

        if (!supplierOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.supplier", supplierId);
        }

        return supplierOpt.get();

    }

    @Override
    public List<Item> findAllItems() {

        Iterable<Item> iterable = itemDao.findAll();

        List<Item> itemList = new ArrayList<>();
        for (Item item : iterable) {
            itemList.add(item);
        }

        return itemList;
    }

}
