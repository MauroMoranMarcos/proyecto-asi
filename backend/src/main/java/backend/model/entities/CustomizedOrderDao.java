package backend.model.entities;

import org.springframework.data.domain.Slice;

public interface CustomizedOrderDao {

    Slice<Order> findOrderDrafts(int page, int size);

    Slice<Order> findOrdersSentToAdmins(int page, int size);

}
