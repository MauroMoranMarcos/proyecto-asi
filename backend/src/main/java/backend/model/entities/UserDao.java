package backend.model.entities;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserDao extends PagingAndSortingRepository<User, Long> {

    boolean existsByUserName(String userName);

}
