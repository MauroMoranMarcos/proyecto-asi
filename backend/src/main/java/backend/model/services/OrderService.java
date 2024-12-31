package backend.model.services;

import backend.model.entities.ItemBox;
import backend.model.entities.Order;
import backend.model.entities.OrderBox;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;

import java.util.List;

public interface OrderService {

    Order createOrder(Long userId) throws PermissionException, InstanceNotFoundException;

    List<OrderBox> addBoxToOrder(Long userId, Long orderId, Long itemId, int numBoxes, int numItemsInBox)
            throws PermissionException, InstanceNotFoundException;

    Block<Order> findOrderDrafts(Long userId, int page, int size) throws PermissionException, InstanceNotFoundException;

    Order findOrderById(Long userId, Long orderId) throws InstanceNotFoundException, PermissionException;

    List<OrderBox> findOrderBoxesById(Long userId, Long orderId) throws InstanceNotFoundException, PermissionException;

    List<OrderBox> updateNumberOfBoxesInOrder(Long userId, Long orderId, Long orderBoxId, int newNumberOfBoxes)
            throws PermissionException, InstanceNotFoundException;

    List<OrderBox> removeBoxFromOrder(Long userId, Long orderId, Long orderBoxId)
            throws PermissionException, InstanceNotFoundException;

    Boolean deleteOrderById(Long userId, Long orderId) throws PermissionException, InstanceNotFoundException;

    Order sendOrderToAdmins(Long userId, Long orderId) throws PermissionException, InstanceNotFoundException;

    Block<Order> findOrdersSentToAdmins(Long userId, int page, int size) throws PermissionException, InstanceNotFoundException;

    void setOrderDone(Long userId, Long orderId) throws PermissionException, InstanceNotFoundException;

    List<Order> findOrderHistory(Long userid);

    void updateWarehouseStock(Long userId, Long orderId, String warehouseName) throws InstanceNotFoundException, PermissionException;

}
