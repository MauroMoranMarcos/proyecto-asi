package backend.rest.controllers;

import backend.model.entities.ItemBox;
import backend.model.entities.ItemBoxDao;
import backend.model.entities.User;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.PermissionException;
import backend.model.services.Block;
import backend.model.services.ItemsService;
import backend.rest.dtos.AddItemBoxToWarehouseParamsDto;
import backend.rest.dtos.BlockDto;
import backend.rest.dtos.ItemBoxDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import static backend.rest.dtos.ItemBoxConversor.toItemBoxDto;
import static backend.rest.dtos.ItemBoxConversor.toItemBoxDtos;
import static backend.rest.dtos.UserConversor.toUserDtos;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/items")
public class ItemsController {

    @Autowired
    private ItemsService itemsService;

    @PostMapping("/addItemBoxToWarehouse")
    public Long addItemBoxToWarehouse(@RequestAttribute Long userId, @ModelAttribute AddItemBoxToWarehouseParamsDto params)
            throws PermissionException, InstanceNotFoundException, IOException {

        return itemsService.addItemBoxToWarehouse(userId, params.getItemName(), params.getReferenceCode(),
                params.getNumItems(), params.getBarCode(), params.getManufacturerRef(), params.getSupplier(),
                params.getImgFile().getBytes(), params.getWarehouseName());

    }

    @GetMapping("/checkInventory")
    public BlockDto<ItemBoxDto> checkInventory(@RequestAttribute Long userId, @RequestParam(defaultValue = "0") int page)
            throws PermissionException, InstanceNotFoundException {

        Block<ItemBox> itemBoxBlock = itemsService.checkInventory(userId, page, 12);

        return new BlockDto<>(toItemBoxDtos(itemBoxBlock.getItems()), itemBoxBlock.getExistMoreItems());

    }

    @GetMapping("/checkInventory/{id}")
    public ItemBoxDto findItemBoxById(@RequestAttribute Long userId, @PathVariable Long id)
            throws PermissionException, InstanceNotFoundException {

        return toItemBoxDto(itemsService.findItemBoxById(userId, id));

    }

}
