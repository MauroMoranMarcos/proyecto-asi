package backend.model.entities;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ItemBoxDao extends PagingAndSortingRepository<ItemBox, Long>, CustomizedItemBoxDao {

    List<ItemBox> findByWarehouse(Warehouse warehouse);

    int countByWarehouse(Warehouse warehouse);

}
