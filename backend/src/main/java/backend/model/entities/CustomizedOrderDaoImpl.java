package backend.model.entities;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Component
public class CustomizedOrderDaoImpl implements CustomizedOrderDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Slice<Order> findOrderDrafts(int page, int size) {

        String queryString = "SELECT o FROM Order o WHERE o.state = 0";

        Query query = entityManager.createQuery(queryString).setFirstResult(page * size).setMaxResults(size + 1);

        List<Order> orders = query.getResultList();
        boolean hasNext = orders.size() == (size+1);

        if (hasNext) {
            orders.remove(orders.size()-1);
        }

        return new SliceImpl<>(orders, PageRequest.of(page, size), hasNext);

    }
}
