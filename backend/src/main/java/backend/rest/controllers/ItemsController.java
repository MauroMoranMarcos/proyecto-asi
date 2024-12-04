package backend.rest.controllers;

import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;
import backend.model.services.ItemsService;
import backend.rest.dtos.AddItemBoxToWarehouseParamsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/items")
public class ItemsController {

    @Autowired
    private ItemsService itemsService;

    @PostMapping("/addItemBoxToWarehouse")
    public Long addItemBoxToWarehouse(@RequestAttribute Long userId, @RequestBody AddItemBoxToWarehouseParamsDto params)
            throws PermissionException, InstanceNotFoundException {

        return itemsService.addItemBoxToWarehouse(userId, params.getItemName(), params.getReferenceCode(),
                params.getNumItems(), params.getBarCode(), params.getManufacturerRef(), params.getSupplier(),
                params.getWarehouseName());

    }

}
