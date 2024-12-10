package backend.model.entities;

import org.springframework.data.domain.Slice;

public interface CustomizedItemDao {

    Slice<Item> findItems(int page, int size);

}
