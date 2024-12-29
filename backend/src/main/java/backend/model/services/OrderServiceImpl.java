package backend.model.services;

import backend.model.entities.*;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService{

    @Autowired
    private PermissionChecker permissionChecker;

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private OrderBoxDao orderBoxDao;

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
    public OrderBox addBoxToOrder(Long userId, Long orderId, Long itemId, int numBoxes, int numItemsInBox) throws PermissionException, InstanceNotFoundException {
        return null;
    }

    @Override
    public Block<Order> findOrderDrafts(Long userId, int page, int size) throws PermissionException {
        return null;
    }

    @Override
    public Order findOrderById(Long userId, Long orderId) throws InstanceNotFoundException, PermissionException {
        return null;
    }

    @Override
    public void updateNumberOfBoxesInOrder(Long userId, Long orderId, Long orderBoxId, int newNumberOfBoxes) throws PermissionException, InstanceNotFoundException {

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

        Order order = orderOpt.get();
        OrderBox orderBox = orderBoxOpt.get();

        if (!order.equals(orderBox.getOrder())) {
            throw new PermissionException();
        }

        orderBox.setNumBoxes((long) newNumberOfBoxes);

    }

    @Override
    public void removeBoxFromOrder(Long userId, Long orderId, Long orderBoxId) throws InstanceNotFoundException, PermissionException {

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

        Order order = orderOpt.get();
        OrderBox orderBox = orderBoxOpt.get();

        if (!order.equals(orderBox.getOrder())) {
            throw new PermissionException();
        }

        orderBoxDao.delete(orderBox);

    }

    @Override
    public void deleteOrderById(Long userId, Long orderId) throws PermissionException, InstanceNotFoundException {

    }

    @Override
    public void sendOrderToAdmins(Long userId, Long orderId) throws PermissionException, InstanceNotFoundException {

    }

    @Override
    public void setOrderDone(Long userId, Long orderId) throws PermissionException, InstanceNotFoundException {

    }

    @Override
    public List<Order> findOrderHistory(Long userid) {
        return null;
    }
}
