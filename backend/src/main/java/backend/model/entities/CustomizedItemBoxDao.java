package backend.model.entities;

import org.springframework.data.domain.Slice;

public interface CustomizedItemBoxDao {

    Slice<ItemBox> findItems(int page, int size);

}
