package backend.model.services;

import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;

public interface ItemsService {

    Long addItemBoxToWarehouse(Long userId, String itemName, String referenceCode, Long numItems, String barCode,
                               String manufacturerRef, String supplier, byte[] imgFile, String warehouseName)
            throws PermissionException, InstanceNotFoundException;

}
