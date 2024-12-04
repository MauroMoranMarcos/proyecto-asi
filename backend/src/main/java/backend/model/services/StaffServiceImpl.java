package backend.model.services;

import backend.model.entities.*;
import backend.model.exceptions.DuplicateInstanceException;
import backend.model.exceptions.IncorrectLoginException;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@Service
@Transactional
public class StaffServiceImpl implements StaffService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private PermissionChecker permissionChecker;

    @Autowired
    private UserDao userDao;

    @Autowired
    private WarehouseDao warehouseDao;

    @Autowired
    private ItemBoxDao itemBoxDao;

    @Override
    public void signUp(User user) throws DuplicateInstanceException {

        if (userDao.existsByUserName(user.getUserName())) {
            throw new DuplicateInstanceException("project.entities.user", user.getUserName());
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userDao.save(user);

    }

    @Override
    @Transactional(readOnly = true)
    public User login(String userName, String password) throws IncorrectLoginException {

        Optional<User> user = userDao.findByUserName(userName);

        if (!user.isPresent()) {
            throw new IncorrectLoginException(userName, password);
        }

        if (!passwordEncoder.matches(password, user.get().getPassword())) {
            throw new IncorrectLoginException(userName, password);
        }

        return user.get();

    }

    @Override
    @Transactional(readOnly=true)
    public User loginFromId(Long id) throws InstanceNotFoundException {
        return permissionChecker.checkUser(id);
    }

    @Override
    public Long addItemBoxToWarehouse(Long userId, String itemName, String referenceCode, Long numItems,
                                      String barCode, String manufacturerRef, String supplier, String warehouseName)
            throws PermissionException, InstanceNotFoundException {

        User user = permissionChecker.checkUser(userId);

        if (!user.getRole().equals(User.RoleType.WAREHOUSE_STAFF)) {
            throw new PermissionException();
        }

        Optional<Warehouse> warehouseOpt = warehouseDao.findByName(warehouseName);

        if (!warehouseOpt.isPresent()) {
            throw new InstanceNotFoundException("project.entities.warehouse", warehouseName);
        }

        ItemBox itemBox = new ItemBox(itemName, numItems, referenceCode, barCode, manufacturerRef, supplier, warehouseOpt.get());
        itemBoxDao.save(itemBox);

        return itemBox.getId();

    }
}
