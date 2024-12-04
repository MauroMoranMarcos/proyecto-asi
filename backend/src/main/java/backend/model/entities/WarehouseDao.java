package backend.model.entities;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface WarehouseDao extends PagingAndSortingRepository<Warehouse, Long> {

    Optional<Warehouse> findByName(String name);

    boolean existsByName(String name);

}
