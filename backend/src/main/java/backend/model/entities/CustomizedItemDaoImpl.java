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
public class CustomizedItemDaoImpl implements CustomizedItemDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Slice<Item> findItems(int page, int size) {

        String queryString = "SELECT i FROM Item i GROUP BY i.itemName ORDER BY i.itemName";

        Query query = entityManager.createQuery(queryString).setFirstResult(page * size).setMaxResults(size + 1);

        List<Item> items = query.getResultList();
        boolean hasNext = items.size() == (size+1);

        if (hasNext) {
            items.remove(items.size()-1);
        }

        return new SliceImpl<>(items, PageRequest.of(page, size), hasNext);

    }

}
