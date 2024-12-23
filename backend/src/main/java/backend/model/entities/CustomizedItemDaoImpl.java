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

    private String[] getTokens(String keywords) {

        if (keywords == null || keywords.length() == 0) {
            return new String[0];
        } else {
            return keywords.split("\\s");
        }
    }

    @Override
    public Slice<Item> findItems(String keywords, int page, int size) {

        String[] tokens = getTokens(keywords);
        String queryString = "SELECT i FROM Item i";

        if (tokens.length > 0) {
            queryString += " WHERE (";
            for (int i = 0; i<tokens.length; i++) {
                queryString += "(LOWER(i.itemName) || LOWER(i.referenceCode) || LOWER(i.barCode)) LIKE LOWER(:token" + i + ")";
                if (i < tokens.length - 1) {
                    queryString += " AND ";
                }
            }
            queryString += " )";
        }

        queryString += " ORDER BY i.itemName";

        Query query = entityManager.createQuery(queryString).setFirstResult(page * size).setMaxResults(size + 1);

        if (tokens.length != 0) {
            for (int i = 0; i<tokens.length; i++) {
                query.setParameter("token" + i, '%' + tokens[i] + '%');
            }
        }

        List<Item> items = query.getResultList();
        boolean hasNext = items.size() == (size+1);

        if (hasNext) {
            items.remove(items.size()-1);
        }

        return new SliceImpl<>(items, PageRequest.of(page, size), hasNext);

    }

}
