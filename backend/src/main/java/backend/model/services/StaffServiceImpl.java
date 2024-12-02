package backend.model.services;

import backend.model.entities.User;
import backend.model.entities.UserDao;
import backend.model.exceptions.DuplicateInstanceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
@Transactional
public class StaffServiceImpl implements StaffService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserDao userDao;

    @Override
    public void signUp(User user) throws DuplicateInstanceException {

        if (userDao.existsByUserName(user.getUserName())) {
            throw new DuplicateInstanceException("project.entities.user", user.getUserName());
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(User.RoleType.ADMIN_STAFF);

        userDao.save(user);

    }
}
