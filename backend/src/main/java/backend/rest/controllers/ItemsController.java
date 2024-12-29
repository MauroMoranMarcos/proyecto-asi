package backend.rest.controllers;

import backend.model.entities.Item;
import backend.model.entities.ItemBox;
import backend.model.entities.ItemBoxDao;
import backend.model.entities.User;
import backend.model.exceptions.InstanceNotFoundException;
import backend.model.exceptions.InvalidNumberOfItemsToAddToBox;
import backend.model.exceptions.InvalidNumberOfItemsToRemoveFromBox;
import backend.model.exceptions.PermissionException;
import backend.model.services.Block;
import backend.model.services.ItemsService;
import backend.rest.dtos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static backend.rest.dtos.ItemBoxConversor.toItemBoxDto;
import static backend.rest.dtos.ItemBoxConversor.toItemBoxDtos;
import static backend.rest.dtos.ItemConversor.toItemDto;
import static backend.rest.dtos.ItemConversor.toItemDtos;
import static backend.rest.dtos.SupplierConversor.toSupplierDto;
import static backend.rest.dtos.SupplierConversor.toSupplierDtos;
import static backend.rest.dtos.UserConversor.toUserDtos;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/items")
public class ItemsController {

    @Autowired
    private ItemsService itemsService;

    @PostMapping("/createItem")
    private ItemDto createItem(@RequestAttribute Long userId, @ModelAttribute CreateItemParamsDto params)
            throws IOException, PermissionException, InstanceNotFoundException {

        return toItemDto(itemsService.createItem(userId, params.getItemName(), params.getReferenceCode(),
                params.getBarCode(), params.getManufacturerRef(), params.getSupplier(), params.getImgFile().getBytes()));

    }

    @GetMapping("/checkInventory")
    public BlockDto<ItemDto> checkInventory(@RequestAttribute Long userId,
            @RequestParam(required = false) String keywords, @RequestParam(defaultValue = "0") int page)
            throws PermissionException, InstanceNotFoundException {

        Block<Item> itemBlock = itemsService.checkInventory(userId, keywords, page, 12);

        return new BlockDto<>(toItemDtos(itemBlock.getItems()), itemBlock.getExistMoreItems());

    }

    @PostMapping("/checkInventory/{id}/addItemBoxToWarehouse")
    public Long addItemBoxToWarehouse(@RequestAttribute Long userId,
                                      @PathVariable Long id,
                                      @RequestBody AddItemBoxToWarehouseParamsDto params)
            throws PermissionException, InstanceNotFoundException {

        return itemsService.addItemBoxToWarehouse(userId, id, params.getNumItems(), params.getWarehouseName());

    }

    @GetMapping("/checkInventory/{id}")
    public ItemDto findItemById(@RequestAttribute Long userId, @PathVariable Long id)
            throws PermissionException, InstanceNotFoundException {

        return toItemDto(itemsService.findItemById(userId, id));

    }

    @GetMapping("/checkInventory/{id}/numBoxes")
    public Long countNumBoxesOfItemId(@RequestAttribute Long userId, @PathVariable Long id)
            throws PermissionException, InstanceNotFoundException {

        return itemsService.countNumBoxesOfItemId(userId, id);

    }

    @GetMapping("/checkInventory/{id}/boxes")
    public List<ItemBoxDto> findAllBoxesOfItemId(@RequestAttribute Long userId, @PathVariable Long id)
            throws PermissionException, InstanceNotFoundException {

        return toItemBoxDtos(itemsService.findAllBoxesOfItemId(userId, id));

    }

    @PostMapping("/checkInventory/{id}/deleteItem")
    public Boolean deleteItem(@RequestAttribute Long userId, @PathVariable Long id)
            throws PermissionException, InstanceNotFoundException {

        return itemsService.deleteItem(userId, id);

    }

    @PutMapping("/checkInventory/{id}/modifyItem")
    public Long modifyItem(@RequestAttribute Long userId,
                           @PathVariable Long id,
                           @ModelAttribute ModifyItemParamsDto params)
            throws IOException, PermissionException, InstanceNotFoundException {

        return itemsService.modifyItem(userId, id, params.getItemName(), params.getReferenceCode(), params.getBarCode(),
                params.getManufacturerRef(), params.getSupplier(), params.getImgFile() != null ? params.getImgFile().getBytes() : null);

    }

    @PutMapping("/checkInventory/{id}/modifyItemBox")
    public Long modifyItemBox(@RequestAttribute Long userId,
                              @PathVariable Long id,
                              @RequestBody ModifyItemBoxParamsDto params)
            throws PermissionException, InstanceNotFoundException {

        return itemsService.modifyItemBox(userId, id, params.getNumItems(), params.getWarehouseName());

    }

    @PutMapping("/checkInventory/{id}/addItemsToBox")
    public Long addItemsToBox(@RequestAttribute Long userId,
                                             @PathVariable Long id,
                                             @RequestParam Long numItemsToAdd)
            throws PermissionException, InstanceNotFoundException, InvalidNumberOfItemsToAddToBox {

        return itemsService.addItemsToBox(userId, id, numItemsToAdd);

    }

    @PutMapping("/checkInventory/{id}/removeItemsFromBox")
    public Long removeItemsToBox(@RequestAttribute Long userId,
                              @PathVariable Long id,
                              @RequestParam Long numItemsToRemove)
            throws PermissionException, InstanceNotFoundException, InvalidNumberOfItemsToRemoveFromBox {

        return itemsService.removeItemsFromBox(userId, id, numItemsToRemove);

    }

    @PostMapping("/checkInventory/{id}/deleteItemBox")
    public Boolean deleteItemBox(@RequestAttribute Long userId, @PathVariable Long id)
            throws PermissionException, InstanceNotFoundException {

        return itemsService.deleteItemBox(userId, id);

    }

    @PostMapping("/suppliers/create")
    public SupplierDto createSupplier(@RequestBody CreateSupplierParamsDto params) {

        return toSupplierDto(itemsService.createSupplier(params.getSupplierName()));

    }

    @GetMapping("/suppliers/findSuppliers")
    public List<SupplierDto> findAllSuppliers() {

        return toSupplierDtos(itemsService.findAllSuppliers());

    }

    @GetMapping("/suppliers/{id}/findItemsFromSupplier")
    public BlockDto<ItemDto> findItemsFromSupplier(@PathVariable Long id, @RequestParam(defaultValue = "0") int page)
            throws InstanceNotFoundException {

        Block<Item> itemBlock = itemsService.findItemsFromSupplier(id, page, 6);

        return new BlockDto<>(toItemDtos(itemBlock.getItems()), itemBlock.getExistMoreItems());

    }

    @GetMapping("/suppliers/{id}")
    public SupplierDto findSupplierById(@PathVariable Long id) throws InstanceNotFoundException {

        return toSupplierDto(itemsService.findSupplierById(id));

    }

    @GetMapping("")
    public List<ItemDto> findAllItems() {

        return toItemDtos(itemsService.findAllItems());

    }

}
