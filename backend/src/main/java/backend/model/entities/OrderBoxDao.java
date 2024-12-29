package backend.model.entities;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface OrderBoxDao extends PagingAndSortingRepository<OrderBox, Long> {

    List<OrderBox> findAllByOrder(Order order);
}
