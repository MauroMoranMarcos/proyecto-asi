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
public class CustomizedItemBoxDaoImpl implements CustomizedItemBoxDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Slice<ItemBox> findItems(int page, int size) {

        String queryString = "SELECT ib FROM ItemBox ib GROUP BY ib.itemName ORDER BY ib.itemName";

        Query query = entityManager.createQuery(queryString).setFirstResult(page * size).setMaxResults(size + 1);

        List<ItemBox> itemBoxes = query.getResultList();
        boolean hasNext = itemBoxes.size() == (size+1);

        if (hasNext) {
            itemBoxes.remove(itemBoxes.size()-1);
        }

        return new SliceImpl<>(itemBoxes, PageRequest.of(page, size), hasNext);

    }
}
