package backend.model.services;

import backend.model.entities.ItemBox;
import backend.model.entities.Order;
import backend.model.entities.OrderBox;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;

import java.util.List;

public interface OrderService {

    Order createOrder(Long userId) throws PermissionException, InstanceNotFoundException;

    OrderBox addBoxToOrder(Long userId, Long orderId, Long itemId, int numBoxes, int numItemsInBox)
            throws PermissionException, InstanceNotFoundException;

    void updateNumberOfBoxesInOrder(Long userId, Long orderId, Long orderBoxId, int newNumberOfBoxes)
            throws PermissionException, InstanceNotFoundException;

    void removeBoxFromOrder(Long userId, Long orderId, Long orderBoxId);

    void deleteOrderById(Long userId, Long orderId) throws PermissionException, InstanceNotFoundException;

    void sendOrderToAdmins(Long userId, Long orderId) throws PermissionException, InstanceNotFoundException;

    void setOrderDone(Long userId, Long orderId) throws PermissionException, InstanceNotFoundException;

    List<Order> findOrderHistory(Long userid);

}
