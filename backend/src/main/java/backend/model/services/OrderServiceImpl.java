package backend.model.services;

import backend.model.entities.*;
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
    public void updateNumberOfBoxesInOrder(Long userId, Long orderId, Long orderBoxId, int newNumberOfBoxes) throws PermissionException, InstanceNotFoundException {

    }

    @Override
    public void removeBoxFromOrder(Long userId, Long orderId, Long orderBoxId) {

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
