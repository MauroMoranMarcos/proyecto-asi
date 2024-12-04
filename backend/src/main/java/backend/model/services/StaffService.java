package backend.model.services;

import backend.model.entities.User;
import backend.model.exceptions.DuplicateInstanceException;
import backend.model.exceptions.IncorrectLoginException;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;

public interface StaffService {

    void signUp(User user) throws DuplicateInstanceException;

    User login(String userName, String password) throws IncorrectLoginException;

    User loginFromId(Long id) throws InstanceNotFoundException;

    Long addItemBoxToWarehouse(Long userId, String itemName, String referenceCode, Long numItems, String barCode,
                               String manufacturerRef, String supplier, String warehouseName)
            throws PermissionException, InstanceNotFoundException;

}
