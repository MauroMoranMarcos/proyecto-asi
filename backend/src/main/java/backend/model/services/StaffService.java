package backend.model.services;

import backend.model.entities.User;
import backend.model.exceptions.DuplicateInstanceException;

public interface StaffService {

    void signUp(User user) throws DuplicateInstanceException;

}
