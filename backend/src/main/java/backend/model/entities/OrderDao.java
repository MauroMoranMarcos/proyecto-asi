package backend.model.entities;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface OrderDao extends PagingAndSortingRepository<Order, Long>, CustomizedOrderDao {
}
