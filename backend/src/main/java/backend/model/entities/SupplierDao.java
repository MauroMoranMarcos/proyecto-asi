package backend.model.entities;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface SupplierDao extends PagingAndSortingRepository<Supplier, Long> {

    boolean existsByName(String name);

    Optional<Supplier> findByName(String name);

}
