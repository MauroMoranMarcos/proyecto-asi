package backend.model.services;

import backend.model.entities.*;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService{

    @Autowired
    private PermissionChecker permissionChecker;

    @Autowired
    private ItemsService itemsService;

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private OrderBoxDao orderBoxDao;

    @Autowired
    private ItemDao itemDao;

    @Autowired
    private WarehouseDao warehouseDao;

    @Override
    public Order createOrder(Long userId) throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        // Le damos valor 0 al estado de la órden porque está como borrador
        Order createdOrder = new Order((short) 0);

        return orderDao.save(createdOrder);
    }

    @Override
    public List<OrderBox> addBoxToOrder(Long userId, Long orderId, Long itemId, int numBoxes, int numItemsInBox) throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<Order> orderOpt = orderDao.findById(orderId);

        if (!orderOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.order", orderId);
        }

        Optional<Item> itemOpt = itemDao.findById(itemId);

        if (!itemOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.item", itemId);
        }

        OrderBox orderBox = new OrderBox(orderOpt.get(), itemOpt.get(), numBoxes, numItemsInBox);

        orderBoxDao.save(orderBox);

        return orderBoxDao.findAllByOrder(orderOpt.get());
    }

    @Override
    public Block<Order> findOrderDrafts(Long userId, int page, int size) throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Slice<Order> slice = orderDao.findOrderDrafts(page, size);

        return new Block<>(slice.getContent(), slice.hasNext());

    }

    @Override
    public Order findOrderById(Long userId, Long orderId) throws InstanceNotFoundException, PermissionException {

        User user = permissionChecker.checkUser(userId);

        Optional<Order> orderOpt = orderDao.findById(orderId);

        if (!orderOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.order", orderId);
        }

        return orderOpt.get();

    }

    @Override
    public List<OrderBox> findOrderBoxesById(Long userId, Long orderId) throws InstanceNotFoundException, PermissionException {

        Optional<Order> orderOpt = orderDao.findById(orderId);

        if (!orderOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.order", orderId);
        }

        return orderOpt.get().getBoxes();

    }

    @Override
    public List<OrderBox> updateNumberOfBoxesInOrder(Long userId, Long orderId, Long orderBoxId, int newNumberOfBoxes) throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<Order> orderOpt = orderDao.findById(orderId);

        if (!orderOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.order", orderId);
        }

        Optional<OrderBox> orderBoxOpt = orderBoxDao.findById(orderBoxId);

        if (!orderBoxOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.orderBox", orderBoxId);
        }

        OrderBox orderBox = orderBoxOpt.get();

        orderBox.setNumBoxes(newNumberOfBoxes);

        orderBoxDao.save(orderBox);

        return orderBoxDao.findAllByOrder(orderOpt.get());
    }

    @Override
    public List<OrderBox> removeBoxFromOrder(Long userId, Long orderId, Long orderBoxId) throws InstanceNotFoundException, PermissionException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<Order> orderOpt = orderDao.findById(orderId);

        if (!orderOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.order", orderId);
        }

        Optional<OrderBox> orderBoxOpt = orderBoxDao.findById(orderBoxId);

        if (!orderBoxOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.orderBox", orderBoxId);
        }

        orderBoxDao.delete(orderBoxOpt.get());

        return orderBoxDao.findAllByOrder(orderOpt.get());
    }

    @Override
    public Boolean deleteOrderById(Long userId, Long orderId) throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<Order> orderOpt = orderDao.findById(orderId);

        if (!orderOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.order", orderId);
        }

        orderDao.delete(orderOpt.get());

        return orderDao.existsById(orderId);

    }

    @Override
    public Order sendOrderToAdmins(Long userId, Long orderId) throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<Order> orderOpt = orderDao.findById(orderId);

        if (!orderOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.order", orderId);
        }

        Order order = orderOpt.get();

        order.setState((short) 1);

        return order;

    }

    @Override
    public Block<Order> findOrdersSentToAdmins(Long userId, int page, int size)
            throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.ADMIN_STAFF)) {
            throw new PermissionException();
        }

        Slice<Order> slice = orderDao.findOrdersSentToAdmins(page, size);

        return new Block<>(slice.getContent(), slice.hasNext());

    }

    @Override
    public Order setOrderDone(Long userId, Long orderId) throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.ADMIN_STAFF)) {
            throw new PermissionException();
        }

        Optional<Order> orderOpt = orderDao.findById(orderId);

        if (!orderOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.order", orderId);
        }

        Order order = orderOpt.get();

        order.setState((short) 2);
        order.setOrderDate(Date.valueOf(LocalDate.now()));

        return order;

    }

    @Override
    public Block<Order> findOrderHistory(Long userId, int page, int size) throws InstanceNotFoundException, PermissionException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.ADMIN_STAFF) && !user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Slice<Order> slice = orderDao.findDoneOrders(page, size);

        return new Block<>(slice.getContent(), slice.hasNext());
    }

    @Override
    public void updateWarehouseStock(Long userId, Long orderId, String warehouseName)
            throws InstanceNotFoundException, PermissionException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<Order> orderOpt = orderDao.findById(orderId);

        if (!orderOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.order", orderId);
        }

        Optional<Warehouse> warehouseOpt = warehouseDao.findByName(warehouseName);

        if (!warehouseOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.warehouse", warehouseName);
        }

        Order order = orderOpt.get();
        Warehouse warehouse = warehouseOpt.get();

        List<OrderBox> orderBoxes = order.getBoxes();

        for (OrderBox orderBox : orderBoxes) {
            Item item = orderBox.getItem();

            itemsService.addItemBoxToWarehouse(userId, item.getId(), (long) orderBox.getNumItemsInBox(), warehouse.getName());
        }

        order.setState((short) 3);

    }
}
