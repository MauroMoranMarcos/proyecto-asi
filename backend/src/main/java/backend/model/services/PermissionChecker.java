package backend.model.services;

import backend.model.entities.User;
import backend.model.exceptions.InstanceNotFoundException;

public interface PermissionChecker {

    User checkUser(Long userId) throws InstanceNotFoundException;

}
