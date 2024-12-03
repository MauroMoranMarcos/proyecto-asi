package backend.model.services;

import backend.model.entities.User;
import backend.model.exceptions.DuplicateInstanceException;
import backend.model.exceptions.IncorrectLoginException;
import backend.model.exceptions.InstanceNotFoundException;

public interface StaffService {

    void signUp(User user) throws DuplicateInstanceException;

    User login(String userName, String password) throws IncorrectLoginException;

    User loginFromId(Long id) throws InstanceNotFoundException;

}
