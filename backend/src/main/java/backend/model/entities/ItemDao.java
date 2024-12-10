package backend.model.entities;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface ItemDao extends PagingAndSortingRepository<Item, Long>, CustomizedItemDao {

    boolean existsByItemName(String itemName);

}
