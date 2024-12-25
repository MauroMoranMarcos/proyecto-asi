package backend.model.entities;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface SupplierDao extends PagingAndSortingRepository<Supplier, Long> {

    boolean existsByName(String name);

}
