package backend.model.services;

import backend.model.entities.Order;
import backend.model.entities.OrderDao;
import backend.model.entities.SupplierDao;
import backend.model.entities.User;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class OrderServiceImpl implements OrderService{

    @Autowired
    private PermissionChecker permissionChecker;

    @Autowired
    private OrderDao orderDao;

    @Override
    public Order createOrder(Long userId, Order order) throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        orderDao.save(order);

        return order;
    }

    @Override
    public Order updateOrder(Long userId, Order order) throws PermissionException, InstanceNotFoundException {
        return null;
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
