package backend.model.services;

import backend.model.entities.Order;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;

import java.util.List;

public interface OrderService {

    Order createOrder(Long userId) throws PermissionException, InstanceNotFoundException;

    Order updateOrder(Long userId, Order order) throws PermissionException, InstanceNotFoundException;

    void deleteOrderById(Long userId, Long orderId) throws PermissionException, InstanceNotFoundException;

    void sendOrderToAdmins(Long userId, Long orderId) throws PermissionException, InstanceNotFoundException;

    void setOrderDone(Long userId, Long orderId) throws PermissionException, InstanceNotFoundException;

    List<Order> findOrderHistory(Long userid);

}
